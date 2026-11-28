import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "../globals.css";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import { htmlLang, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { AppShell } from "@astryxdesign/core/AppShell";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudienceTheme } from "@/components/AudienceTheme";
import { menuLinks, primaryLinks } from "@/components/siteNav";
import { Providers } from "../providers";
import { getDictionary, getLocale } from "./dictionaries";

// One family, Onest, for headings and text. Latin Extended covers š, đ, č,
// ć, ž. The zastiti theme reads it through --font-onest. display: "swap"
// shows the size-matched fallback at once and swaps Onest in when it loads.
const onest = Onest({
  subsets: ["latin", "latin-ext"],
  variable: "--font-onest",
  display: "swap",
});

// Cache Components needs every root param value listed. Unknown values are
// rejected in getLocale() with notFound().
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Defaults for every page. Each page adds its own title, canonical,
// hreflang and Open Graph tags through pageMetadata() in lib/metadata.ts.
export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getDictionary();
  return {
    metadataBase: siteUrl,
    title: metadata["default-title"],
    description: metadata["default-description"],
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const messages = await getDictionary();
  const { components } = messages;
  return (
    // data-astryx-theme: the theme's tokens (page paper, Onest) are scoped
    // to it. The root Theme only copies it here after hydration, so <body>
    // painted in Astryx's defaults until then.
    // suppressHydrationWarning: the script below adds data-theme before
    // React hydrates, which React would report as a mismatch. It only
    // covers <html>'s own attributes, not its children.
    <html
      lang={htmlLang[locale]}
      className={onest.variable}
      data-astryx-theme="zastiti"
      suppressHydrationWarning
    >
      <head>
        {/* The reader's saved light/dark pick (components/ColorMode.tsx
            keeps it under this key), applied before the first paint. Pages
            are static, so the server can't render it; React only reads it
            after hydration. Without a pick the page follows the OS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=localStorage.getItem("zastiti-color-mode");if(m==="light"||m==="dark")document.documentElement.setAttribute("data-theme",m)}catch(e){}`,
          }}
        />
      </head>
      <body>
        <Providers>
          <AudienceTheme>
            <AppShell
              height="auto"
              variant="section"
              // Off: AppShell picks its mobile bar with a JavaScript media
              // query, which the server can't run, so phones got the desktop
              // bar first. SiteHeader renders both bars and CSS picks one
              // (under 1024px: the name, SOS and its own menu toggle).
              mobileNav={false}
              topNav={
                <SiteHeader
                  locale={locale}
                  content={{
                    siteName: components.header.siteName,
                    navLabel: components.header.menuButtonTitle,
                    closeMenuLabel: components.header.closeMenu,
                    sosLabel: components.header.sosButton,
                    languageLabel: components.header.languageSwitcherAria,
                    themeDarkLabel: components.header.themeDark,
                    themeLightLabel: components.header.themeLight,
                    primary: primaryLinks(messages),
                    menu: menuLinks(messages),
                  }}
                />
              }
            >
              {children}
            </AppShell>
          </AudienceTheme>
          <SiteFooter
            locale={locale}
            siteName={components.header.siteName}
            tagline={components.header.sheetSubtitle}
            contactLabel={components.header.menu.contact}
            footer={components.footer}
          />
        </Providers>
      </body>
    </html>
  );
}
