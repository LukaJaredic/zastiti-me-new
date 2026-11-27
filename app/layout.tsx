import type { Metadata } from "next";
import { Fraunces, Onest } from "next/font/google";
import "./globals.css";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import { Providers } from "./providers";

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

export const metadata: Metadata = {
  title: "Zaštiti me",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr" className={`${onest.variable} ${fraunces.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
