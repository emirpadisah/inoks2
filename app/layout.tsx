import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "İnoks Muğla | Endüstriyel Mutfak",
  description:
    "Muğla merkezli İnoks Muğla; otel, restoran, catering ve hastane projeleri için paslanmaz endüstriyel mutfak ekipmanları üretir."
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
