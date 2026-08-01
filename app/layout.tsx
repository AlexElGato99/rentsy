import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { getLocale } from "@/lib/i18n/get-locale";
import { LOCALE_DIR } from "@/lib/i18n/config";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rentsy",
  description: "Find your next place to rent, or list your property for free.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = LOCALE_DIR[locale];

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${dir === "rtl" ? "font-arabic" : ""}`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
