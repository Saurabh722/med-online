"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CategoryFormData {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  image: string;
  productCount: number;
  featured: boolean;
}

interface Props {
  category?: CategoryFormData;
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const COLOR_PRESETS = [
  { color: "text-teal-600", bgColor: "bg-teal-50", textColor: "text-teal-700", label: "Teal" },
  { color: "text-blue-600", bgColor: "bg-blue-50", textColor: "text-blue-700", label: "Blue" },
  { color: "text-purple-600", bgColor: "bg-purple-50", textColor: "text-purple-700", label: "Purple" },
  { color: "text-rose-600", bgColor: "bg-rose-50", textColor: "text-rose-700", label: "Rose" },
  { color: "text-amber-600", bgColor: "bg-amber-50", textColor: "text-amber-700", label: "Amber" },
  { color: "text-emerald-600", bgColor: "bg-emerald-50", textColor: "text-emerald-700", label: "Emerald" },
];

export default function CategoryForm({ category }: Props) {
  const isEdit = !!category;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CategoryFormData>({
    id: category?.id ?? "",
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? "",
    icon: category?.icon ?? "💊",
    color: category?.color ?? "text-teal-600",
    bgColor: category?.bgColor ?? "bg-teal-50",
    textColor: category?.textColor ?? "text-teal-700",
    image: category?.image ?? "",
    productCount: category?.productCount ?? 0,
    featured: category?.featured ?? false,
  });

  const set = (key: keyof CategoryFormData, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === toSlug(prev.name) || !prev.slug ? toSlug(name) : prev.slug,
      id: prev.id === toSlug(prev.name) || !prev.id ? toSlug(name) : prev.id,
    }));
  };

  const applyPreset = (preset: (typeof COLOR_PRESETS)[0]) => {
    setForm((prev) => ({
      ...prev,
      color: preset.color,
      bgColor: preset.bgColor,
      textColor: preset.textColor,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const url = isEdit
      ? `/api/admin/categories/${category!._id}`
      : "/api/admin/categories";
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Category" : "New Category"}
        </h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Category"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
            Details
          </h2>
          <div>
            <label className={labelCls}>Name *</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={inputCls}
              placeholder="e.g. Weight Loss"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Slug *</label>
              <input
                required
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                className={inputCls}
                placeholder="weight-loss"
              />
            </div>
            <div>
              <label className={labelCls}>ID *</label>
              <input
                required
                type="text"
                value={form.id}
                onChange={(e) => set("id", e.target.value)}
                className={inputCls}
                placeholder="weight-loss"
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description *</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className={inputCls + " resize-none"}
              placeholder="Short description of the category"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Emoji Icon</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => set("icon", e.target.value)}
                className={inputCls}
                placeholder="e.g. ⚖️"
              />
            </div>
            <div>
              <label className={labelCls}>Product Count</label>
              <input
                type="number"
                min={0}
                value={form.productCount}
                onChange={(e) => set("productCount", parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              className={inputCls}
              placeholder="https://example.com/image.jpg"
            />
            {form.image && (
              <img
                src={form.image}
                alt=""
                className="mt-2 w-full h-32 object-cover rounded-lg border border-gray-200"
              />
            )}
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">Featured category</span>
          </label>
        </div>

        {/* Color */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
            Color Theme
          </h2>
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${p.bgColor} ${p.textColor} border-2 transition-all ${
                  form.bgColor === p.bgColor ? "border-gray-700" : "border-transparent"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Color</label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => set("color", e.target.value)}
                className={inputCls}
                placeholder="text-teal-600"
              />
            </div>
            <div>
              <label className={labelCls}>Bg Color</label>
              <input
                type="text"
                value={form.bgColor}
                onChange={(e) => set("bgColor", e.target.value)}
                className={inputCls}
                placeholder="bg-teal-50"
              />
            </div>
            <div>
              <label className={labelCls}>Text Color</label>
              <input
                type="text"
                value={form.textColor}
                onChange={(e) => set("textColor", e.target.value)}
                className={inputCls}
                placeholder="text-teal-700"
              />
            </div>
          </div>
          {/* Preview */}
          <div className={`rounded-xl p-4 inline-flex items-center gap-2 ${form.bgColor}`}>
            <span>{form.icon}</span>
            <span className={`text-sm font-semibold ${form.textColor}`}>{form.name || "Category Name"}</span>
          </div>
        </div>
      </div>
    </form>
  );
}
