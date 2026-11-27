import type { Metadata } from "next";
import { Fraunces, Onest } from "next/font/google";
import "../globals.css";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import { htmlLang, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { AppShell } from "@astryxdesign/core/AppShell";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AudienceTheme } from "@/components/AudienceTheme";
import { allLinks, primaryLinks } from "@/components/siteNav";
import { Providers } from "../providers";
import { getDictionary, getLocale } from "./dictionaries";

// Body: Onest. Headings: Fraunces. Latin Extended covers š, đ, č, ć, ž.
// The zastiti theme reads these through --font-onest and --font-fraunces.
const onest = Onest({
  subsets: ["latin", "latin-ext"],
  variable: "--font-onest",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-fraunces",
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
    <html
      lang={htmlLang[locale]}
      className={`${onest.variable} ${fraunces.variable}`}
    >
      <body>
        <Providers>
          <AudienceTheme>
            <AppShell
              height="auto"
              variant="section"
              // Under 1024px the words, language and theme switch no longer
              // fit beside the name: keep the name, SOS and the menu.
              // SiteHeader renders its own 44px, labelled menu toggle.
              mobileNav={{ breakpoint: "lg", hasToggle: false }}
              topNav={
                <SiteHeader
                  locale={locale}
                  content={{
                    siteName: components.header.siteName,
                    navLabel: components.header.menuButtonTitle,
                    sosLabel: components.header.sosButton,
                    languageLabel: components.header.languageSwitcherAria,
                    themeDarkLabel: components.header.themeDark,
                    themeLightLabel: components.header.themeLight,
                    primary: primaryLinks(messages),
                    all: allLinks(messages),
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
