import type { Metadata } from "next";
import { Fraunces, Onest } from "next/font/google";
import "../globals.css";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import { htmlLang, locales } from "@/lib/i18n";
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

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = await getDictionary();
  return {
    title: metadata["default-title"],
    description: metadata["default-description"],
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  return (
    <html
      lang={htmlLang[locale]}
      className={`${onest.variable} ${fraunces.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
