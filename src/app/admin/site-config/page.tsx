"use client";

import { useEffect, useState } from "react";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface Stat {
  value: string;
  label: string;
}

interface TrustBadge {
  title: string;
  description: string;
}

interface NavCategory {
  name: string;
  slug: string;
}

interface SiteConfig {
  steps: Step[];
  stats: Stat[];
  trustBadges: TrustBadge[];
  navigation: { categories: NavCategory[] };
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";
const labelCls = "block text-xs font-medium text-gray-500 mb-1";

const empty: SiteConfig = {
  steps: [],
  stats: [],
  trustBadges: [],
  navigation: { categories: [] },
};

export default function SiteConfigPage() {
  const [config, setConfig] = useState<SiteConfig>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((r) => r.json())
      .then((data) => {
        if (data) setConfig(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "main", ...config }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Steps
  const addStep = () =>
    setConfig((c) => ({
      ...c,
      steps: [
        ...c.steps,
        { step: c.steps.length + 1, title: "", description: "", icon: "💊" },
      ],
    }));
  const removeStep = (i: number) =>
    setConfig((c) => ({
      ...c,
      steps: c.steps
        .filter((_, idx) => idx !== i)
        .map((s, idx) => ({ ...s, step: idx + 1 })),
    }));
  const updateStep = (i: number, key: keyof Step, val: string | number) =>
    setConfig((c) => {
      const steps = [...c.steps];
      steps[i] = { ...steps[i], [key]: val };
      return { ...c, steps };
    });

  // Stats
  const addStat = () =>
    setConfig((c) => ({ ...c, stats: [...c.stats, { value: "", label: "" }] }));
  const removeStat = (i: number) =>
    setConfig((c) => ({ ...c, stats: c.stats.filter((_, idx) => idx !== i) }));
  const updateStat = (i: number, key: keyof Stat, val: string) =>
    setConfig((c) => {
      const stats = [...c.stats];
      stats[i] = { ...stats[i], [key]: val };
      return { ...c, stats };
    });

  // TrustBadges
  const addBadge = () =>
    setConfig((c) => ({
      ...c,
      trustBadges: [...c.trustBadges, { title: "", description: "" }],
    }));
  const removeBadge = (i: number) =>
    setConfig((c) => ({
      ...c,
      trustBadges: c.trustBadges.filter((_, idx) => idx !== i),
    }));
  const updateBadge = (i: number, key: keyof TrustBadge, val: string) =>
    setConfig((c) => {
      const trustBadges = [...c.trustBadges];
      trustBadges[i] = { ...trustBadges[i], [key]: val };
      return { ...c, trustBadges };
    });

  // Nav categories
  const addNavCat = () =>
    setConfig((c) => ({
      ...c,
      navigation: {
        categories: [...c.navigation.categories, { name: "", slug: "" }],
      },
    }));
  const removeNavCat = (i: number) =>
    setConfig((c) => ({
      ...c,
      navigation: {
        categories: c.navigation.categories.filter((_, idx) => idx !== i),
      },
    }));
  const updateNavCat = (i: number, key: keyof NavCategory, val: string) =>
    setConfig((c) => {
      const categories = [...c.navigation.categories];
      categories[i] = { ...categories[i], [key]: val };
      return { ...c, navigation: { ...c.navigation, categories } };
    });

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="h-8 bg-gray-100 rounded w-1/4 mb-8 animate-pulse" />
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-xl border border-gray-100 animate-pulse" />
            ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Config</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Edit steps, stats, trust badges and navigation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-emerald-600 text-sm font-medium">✓ Saved!</span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Steps */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              How It Works Steps
            </h2>
            <button
              type="button"
              onClick={addStep}
              className="text-teal-600 text-sm font-medium hover:text-teal-700"
            >
              + Add Step
            </button>
          </div>
          <div className="space-y-4">
            {config.steps.map((step, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 relative">
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-lg leading-none"
                >
                  ×
                </button>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className={labelCls}>Step #</label>
                    <input
                      type="number"
                      min={1}
                      value={step.step}
                      onChange={(e) => updateStep(i, "step", parseInt(e.target.value))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Icon (emoji)</label>
                    <input
                      type="text"
                      value={step.icon}
                      onChange={(e) => updateStep(i, "icon", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateStep(i, "title", e.target.value)}
                      className={inputCls}
                      placeholder="Step title"
                    />
                  </div>
                  <div className="col-span-4">
                    <label className={labelCls}>Description</label>
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => updateStep(i, "description", e.target.value)}
                      className={inputCls}
                      placeholder="Brief step description"
                    />
                  </div>
                </div>
              </div>
            ))}
            {config.steps.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No steps yet.</p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Site Stats
            </h2>
            <button
              type="button"
              onClick={addStat}
              className="text-teal-600 text-sm font-medium hover:text-teal-700"
            >
              + Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {config.stats.map((stat, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1">
                  <label className={labelCls}>Value</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(i, "value", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 50,000+"
                  />
                </div>
                <div className="flex-1">
                  <label className={labelCls}>Label</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(i, "label", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. patients served"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="mt-6 text-red-400 hover:text-red-600 text-xl leading-none px-1"
                >
                  ×
                </button>
              </div>
            ))}
            {config.stats.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No stats yet.</p>
            )}
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Trust Badges
            </h2>
            <button
              type="button"
              onClick={addBadge}
              className="text-teal-600 text-sm font-medium hover:text-teal-700"
            >
              + Add Badge
            </button>
          </div>
          <div className="space-y-3">
            {config.trustBadges.map((badge, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1">
                  <label className={labelCls}>Title</label>
                  <input
                    type="text"
                    value={badge.title}
                    onChange={(e) => updateBadge(i, "title", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. HIPAA Compliant"
                  />
                </div>
                <div className="flex-1">
                  <label className={labelCls}>Description</label>
                  <input
                    type="text"
                    value={badge.description}
                    onChange={(e) => updateBadge(i, "description", e.target.value)}
                    className={inputCls}
                    placeholder="Short description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBadge(i)}
                  className="mt-6 text-red-400 hover:text-red-600 text-xl leading-none px-1"
                >
                  ×
                </button>
              </div>
            ))}
            {config.trustBadges.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No trust badges yet.</p>
            )}
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Header Navigation Categories
            </h2>
            <button
              type="button"
              onClick={addNavCat}
              className="text-teal-600 text-sm font-medium hover:text-teal-700"
            >
              + Add Category
            </button>
          </div>
          <div className="space-y-3">
            {config.navigation.categories.map((cat, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="flex-1">
                  <label className={labelCls}>Display Name</label>
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) => updateNavCat(i, "name", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. Weight Loss"
                  />
                </div>
                <div className="flex-1">
                  <label className={labelCls}>Slug</label>
                  <input
                    type="text"
                    value={cat.slug}
                    onChange={(e) => updateNavCat(i, "slug", e.target.value)}
                    className={inputCls}
                    placeholder="e.g. weight-loss"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNavCat(i)}
                  className="mt-6 text-red-400 hover:text-red-600 text-xl leading-none px-1"
                >
                  ×
                </button>
              </div>
            ))}
            {config.navigation.categories.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No nav categories yet.</p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>
    </form>
  );
}
