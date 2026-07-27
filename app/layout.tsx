import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMK Muhammadiyah 1 Gresik - Sekolah Menengah Kejuruan Unggulan",
  description:
    "SMK Muhammadiyah 1 Gresik - Membentuk generasi profesional siap kerja, berkarakter, dan berinovasi di era industri 4.0. Daftar sekarang!",
  keywords: [
    "SMK",
    "sekolah menengah kejuruan",
    "vocational school",
    "PPDB",
    "pendidikan",
    "teknologi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        notoSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
