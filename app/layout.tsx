import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import { siteName, siteVersion } from "@/data/global";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // optional, if you want to use it with Tailwind
});

export const metadata: Metadata = {
  title: siteName,
  description: `${siteName} Personal Blog`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-version={siteVersion}>
      <body className={`${inter.variable} antialiased text-base`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
