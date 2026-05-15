import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mantom | Premium Doğal Taş",
  description:
    "Mermer, traverten, kireç taşı ve oniks odaklı premium doğal taş projeleri için modern bir tanıtım sitesi."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="tr">
      <body>{children}</body>
    </html>
  );
}
