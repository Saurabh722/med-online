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

const DEFAULT_META = {
  title: "MedOnline — Modern Healthcare Delivered to Your Door",
  description:
    "Consult licensed physicians online and get FDA-approved prescriptions for weight loss, men's health, women's health, skincare, and more. Fast, private, affordable.",
  keywords:
    "telehealth, online pharmacy, weight loss, men's health, women's health, skincare, prescription delivery",
};

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig().catch(() => null);
  const meta = siteConfig?.appearance?.meta;
  return {
    title: meta?.title || DEFAULT_META.title,
    description: meta?.description || DEFAULT_META.description,
    keywords: meta?.keywords || DEFAULT_META.keywords,
  };
}

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
  const appearance = siteConfig?.appearance;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        <Header categories={navCategories} appearance={appearance} />
        <main>{children}</main>
        <Footer categories={navCategories} appearance={appearance} />
      </body>
    </html>
  );
}
