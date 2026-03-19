import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MedOnline — Modern Healthcare Delivered to Your Door",
  description:
    "Consult licensed physicians online and get FDA-approved prescriptions for weight loss, men's health, women's health, skincare, and more. Fast, private, affordable.",
  keywords: "telehealth, online pharmacy, weight loss, men's health, women's health, skincare, prescription delivery",
};

const FALLBACK_NAV = [
  { name: "Weight Loss", slug: "weight-loss" },
  { name: "Men's Health", slug: "mens-health" },
  { name: "Women's Health", slug: "womens-health" },
  { name: "Mental Health", slug: "mental-health" },
  { name: "Skincare", slug: "skincare" },
  { name: "Sleep", slug: "sleep" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfig = await getSiteConfig().catch(() => null);
  const navCategories = siteConfig?.navigation?.categories ?? FALLBACK_NAV;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <Header categories={navCategories} />
        <main>{children}</main>
        <Footer categories={navCategories} />
      </body>
    </html>
  );
}
