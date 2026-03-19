import Link from "next/link";
import type { AppearanceConfig, NavCategory } from "@/types";

const DEFAULT_APPEARANCE: AppearanceConfig = {
  logo: { letter: "M", primaryText: "Med", accentText: "Online" },
  meta: { title: "", description: "", keywords: "" },
  header: { ctaLinks: [], ctaButton: { label: "", href: "" } },
  footer: {
    description: "Personalized, evidence-based healthcare delivered to your door. Licensed physicians. FDA-approved treatments.",
    companyLinks: [
      { label: "About Us", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
    supportLinks: [
      { label: "Help Center", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "HIPAA Notice", href: "#" },
      { label: "Accessibility", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
    copyright: `© ${new Date().getFullYear()} MedOnline, Inc. All rights reserved.`,
  },
};

export default function Footer({
  categories,
  appearance,
}: {
  categories: NavCategory[];
  appearance?: AppearanceConfig;
}) {
  const app = appearance ?? DEFAULT_APPEARANCE;
  const { logo, footer } = app;
  const footerData = Object.keys(footer).length ? footer : DEFAULT_APPEARANCE.footer;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{logo.letter}</span>
              </div>
              <span className="text-xl font-bold text-white">
                {logo.primaryText}<span className="text-teal-400">{logo.accentText}</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {footerData.description}
            </p>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Treatments</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {footerData.companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {footerData.supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">{footerData.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              HIPAA Compliant
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
