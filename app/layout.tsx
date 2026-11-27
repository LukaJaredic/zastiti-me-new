import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zaštiti me",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
