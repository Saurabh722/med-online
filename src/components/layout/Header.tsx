"use client";

import Link from "next/link";
import { useState } from "react";
import type { AppearanceConfig, NavCategory } from "@/types";

const DEFAULT_APPEARANCE: AppearanceConfig = {
  logo: { letter: "M", primaryText: "Med", accentText: "Online" },
  meta: { title: "", description: "", keywords: "" },
  header: {
    ctaLinks: [{ label: "All Products", href: "/products" }],
    ctaButton: { label: "Get Started", href: "/get-started" },
  },
  footer: { description: "", companyLinks: [], supportLinks: [], copyright: "" },
};

export default function Header({
  categories,
  appearance,
}: {
  categories: NavCategory[];
  appearance?: AppearanceConfig;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const app = appearance ?? DEFAULT_APPEARANCE;
  const { logo, header } = app;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{logo.letter}</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {logo.primaryText}<span className="text-teal-600">{logo.accentText}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {header.ctaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={header.ctaButton.href}
              className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full hover:bg-teal-700 transition-colors"
            >
              {header.ctaButton.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-100">
            <nav className="flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                {header.ctaLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-teal-600 rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={header.ctaButton.href}
                  className="mx-3 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full text-center hover:bg-teal-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {header.ctaButton.label}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
