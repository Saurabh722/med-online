"use client";

import { useEffect, useState } from "react";
import type { AppearanceConfig, SiteLink } from "@/types";

const DEFAULT: AppearanceConfig = {
  logo: { letter: "M", primaryText: "Med", accentText: "Online" },
  meta: {
    title: "MedOnline — Modern Healthcare Delivered to Your Door",
    description:
      "Consult licensed physicians online and get FDA-approved prescriptions for weight loss, men's health, women's health, skincare, and more.",
    keywords: "telehealth, online pharmacy, weight loss, men's health, women's health",
  },
  header: {
    ctaLinks: [{ label: "All Products", href: "/products" }],
    ctaButton: { label: "Get Started", href: "/get-started" },
  },
  footer: {
    description:
      "Personalized, evidence-based healthcare delivered to your door. Licensed physicians. FDA-approved treatments.",
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

function LinkListEditor({
  links,
  onChange,
}: {
  links: SiteLink[];
  onChange: (links: SiteLink[]) => void;
}) {
  const update = (i: number, field: keyof SiteLink, val: string) => {
    const next = links.map((l, idx) => (idx === i ? { ...l, [field]: val } : l));
    onChange(next);
  };
  const add = () => onChange([...links, { label: "", href: "" }]);
  const remove = (i: number) => onChange(links.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={link.label}
            onChange={(e) => update(i, "label", e.target.value)}
            placeholder="Label"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            value={link.href}
            onChange={(e) => update(i, "href", e.target.value)}
            placeholder="URL (e.g. /about or https://...)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={() => remove(i)}
            className="text-red-500 hover:text-red-700 px-2 text-lg leading-none"
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
      >
        + Add Link
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {hint && <span className="ml-2 text-xs text-gray-400 font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export default function AppearancePage() {
  const [form, setForm] = useState<AppearanceConfig>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((r) => r.json())
      .then((data) => {
        if (data?.appearance && Object.keys(data.appearance).length > 0) {
          setForm({ ...DEFAULT, ...data.appearance });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appearance: form }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const setLogo = (k: keyof AppearanceConfig["logo"], v: string) =>
    setForm((f) => ({ ...f, logo: { ...f.logo, [k]: v } }));
  const setMeta = (k: keyof AppearanceConfig["meta"], v: string) =>
    setForm((f) => ({ ...f, meta: { ...f.meta, [k]: v } }));
  const setHeader = (k: keyof AppearanceConfig["header"], v: unknown) =>
    setForm((f) => ({ ...f, header: { ...f.header, [k]: v } }));
  const setFooter = (k: keyof AppearanceConfig["footer"], v: unknown) =>
    setForm((f) => ({ ...f, footer: { ...f.footer, [k]: v } }));

  const inputCls =
    "w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500";
  const textareaCls =
    "w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appearance</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage logo, site metadata, header buttons, and footer content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm text-teal-600 font-medium">✓ Saved</span>
          )}
          {error && <span className="text-sm text-red-500">{error}</span>}
          <button
            onClick={save}
            disabled={saving}
            className="px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Logo */}
      <Section title="Logo">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Letter / Icon" hint="shown in the logo badge">
            <input
              value={form.logo.letter}
              onChange={(e) => setLogo("letter", e.target.value)}
              maxLength={3}
              className={inputCls}
            />
          </Field>
          <Field label="Primary Text">
            <input
              value={form.logo.primaryText}
              onChange={(e) => setLogo("primaryText", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Accent Text" hint="shown in teal">
            <input
              value={form.logo.accentText}
              onChange={(e) => setLogo("accentText", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
        {/* Live Preview */}
        <div className="mt-2 flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">{form.logo.letter || "M"}</span>
          </div>
          <span className="text-xl font-bold text-gray-900">
            {form.logo.primaryText || "Med"}
            <span className="text-teal-600">{form.logo.accentText || "Online"}</span>
          </span>
          <span className="ml-3 text-xs text-gray-400">← live preview</span>
        </div>
      </Section>

      {/* Site Metadata */}
      <Section title="Site Metadata">
        <Field label="Page Title" hint="shown in browser tab and search results">
          <input
            value={form.meta.title}
            onChange={(e) => setMeta("title", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Meta Description" hint="shown in search results (160 chars recommended)">
          <textarea
            value={form.meta.description}
            onChange={(e) => setMeta("description", e.target.value)}
            rows={3}
            className={textareaCls}
          />
          <p className="text-xs text-gray-400 mt-1">{form.meta.description.length} characters</p>
        </Field>
        <Field label="Keywords" hint="comma separated">
          <input
            value={form.meta.keywords}
            onChange={(e) => setMeta("keywords", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* Header */}
      <Section title="Header">
        <Field label="Text Links" hint="shown before the main CTA button">
          <LinkListEditor
            links={form.header.ctaLinks}
            onChange={(links) => setHeader("ctaLinks", links)}
          />
        </Field>
        <Field label="CTA Button">
          <div className="flex gap-3">
            <input
              value={form.header.ctaButton.label}
              onChange={(e) =>
                setHeader("ctaButton", { ...form.header.ctaButton, label: e.target.value })
              }
              placeholder="Button label"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              value={form.header.ctaButton.href}
              onChange={(e) =>
                setHeader("ctaButton", { ...form.header.ctaButton, href: e.target.value })
              }
              placeholder="URL (e.g. /get-started)"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </Field>
      </Section>

      {/* Footer */}
      <Section title="Footer">
        <Field label="Description">
          <textarea
            value={form.footer.description}
            onChange={(e) => setFooter("description", e.target.value)}
            rows={3}
            className={textareaCls}
          />
        </Field>
        <Field label="Copyright Text">
          <input
            value={form.footer.copyright}
            onChange={(e) => setFooter("copyright", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Company Links">
          <LinkListEditor
            links={form.footer.companyLinks}
            onChange={(links) => setFooter("companyLinks", links)}
          />
        </Field>
        <Field label="Support Links">
          <LinkListEditor
            links={form.footer.supportLinks}
            onChange={(links) => setFooter("supportLinks", links)}
          />
        </Field>
      </Section>
    </div>
  );
}
