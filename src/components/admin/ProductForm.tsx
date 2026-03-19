"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface FAQ {
  question: string;
  answer: string;
}

interface Category {
  _id?: string;
  id: string;
  name: string;
  slug: string;
}

interface ProductFormData {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  priceUnit: string;
  originalPrice: number | "";
  image: string;
  badge: string;
  badgeColor: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  prescriptionRequired: boolean;
  stockCount: number;
  howItWorks: string[];
  benefits: string[];
  ingredients: string[];
  sideEffects: string[];
  faqs: FAQ[];
}

interface Props {
  product?: ProductFormData;
  categories: Category[];
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

function ArrayInput({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const add = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) => {
    const updated = [...items];
    updated[i] = val;
    onChange(updated);
  };

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={inputCls + " flex-1"}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1"
      >
        <span className="text-lg leading-none">+</span> Add {label}
      </button>
    </div>
  );
}

function FAQInput({ faqs, onChange }: { faqs: FAQ[]; onChange: (faqs: FAQ[]) => void }) {
  const add = () => onChange([...faqs, { question: "", answer: "" }]);
  const remove = (i: number) => onChange(faqs.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof FAQ, val: string) => {
    const updated = [...faqs];
    updated[i] = { ...updated[i], [field]: val };
    onChange(updated);
  };

  return (
    <div>
      <label className={labelCls}>FAQs</label>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4 relative">
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-2 right-3 text-red-400 hover:text-red-600 text-xl leading-none"
            >
              ×
            </button>
            <div className="mb-2">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Question</label>
              <input
                value={faq.question}
                onChange={(e) => update(i, "question", e.target.value)}
                placeholder="e.g. How long until I see results?"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Answer</label>
              <textarea
                value={faq.answer}
                onChange={(e) => update(i, "answer", e.target.value)}
                rows={2}
                placeholder="Enter answer"
                className={inputCls + " resize-none"}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-teal-600 text-sm font-medium hover:text-teal-700 flex items-center gap-1"
      >
        <span className="text-lg leading-none">+</span> Add FAQ
      </button>
    </div>
  );
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadError("");
      setUploading(true);
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        onChange(data.url);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    [onChange]
  );

  return (
    <div>
      <label className={labelCls}>Product Image</label>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="w-32 h-24 object-cover rounded-lg border border-gray-200 mb-2"
        />
      )}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
        className={inputCls + " mb-2"}
      />
      <div className="flex items-center gap-2">
        <label
          className={`cursor-pointer px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading…" : "Upload file"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
        <span className="text-xs text-gray-400">JPEG, PNG, WebP — max 5 MB</span>
      </div>
      {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
    </div>
  );
}

const BADGE_COLORS = [
  "bg-teal-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-pink-500",
  "bg-gray-800",
];

export default function ProductForm({ product, categories }: Props) {
  const isEdit = !!product;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ProductFormData>({
    id: product?.id ?? "",
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category: product?.category ?? (categories[0]?.slug ?? ""),
    tagline: product?.tagline ?? "",
    description: product?.description ?? "",
    shortDescription: product?.shortDescription ?? "",
    price: product?.price ?? 0,
    priceUnit: product?.priceUnit ?? "month",
    originalPrice: product?.originalPrice ?? "",
    image: product?.image ?? "",
    badge: product?.badge ?? "",
    badgeColor: product?.badgeColor ?? "bg-teal-500",
    rating: product?.rating ?? 4.5,
    reviewCount: product?.reviewCount ?? 0,
    featured: product?.featured ?? false,
    inStock: product?.inStock ?? true,
    prescriptionRequired: product?.prescriptionRequired ?? false,
    stockCount: product?.stockCount ?? 0,
    howItWorks: product?.howItWorks?.length ? product.howItWorks : [""],
    benefits: product?.benefits?.length ? product.benefits : [""],
    ingredients: product?.ingredients?.length ? product.ingredients : [""],
    sideEffects: product?.sideEffects?.length ? product.sideEffects : [""],
    faqs: product?.faqs?.length ? product.faqs : [],
  });

  const set = (key: keyof ProductFormData, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === toSlug(prev.name) || !prev.slug ? toSlug(name) : prev.slug,
      id: prev.id === ("prod-" + toSlug(prev.name)) || !prev.id ? "prod-" + toSlug(name) : prev.id,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const url = isEdit
      ? `/api/admin/products/${product!._id}`
      : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      ...form,
      originalPrice: form.originalPrice === "" ? undefined : form.originalPrice,
      howItWorks: form.howItWorks.filter(Boolean),
      benefits: form.benefits.filter(Boolean),
      ingredients: form.ingredients.filter(Boolean),
      sideEffects: form.sideEffects.filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Product" : "New Product"}
          </h1>
          {isEdit && (
            <p className="text-gray-500 text-sm mt-0.5">Editing: {product!.name}</p>
          )}
        </div>
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
            className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Basic Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Product Name *</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inputCls}
                  placeholder="e.g. Semaglutide Weight Loss Program"
                />
              </div>
              <div>
                <label className={labelCls}>Slug *</label>
                <input
                  required
                  type="text"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className={inputCls}
                  placeholder="semaglutide-weight-loss"
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
                  placeholder="prod-semaglutide"
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Category *</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputCls}
                >
                  {categories.map((c) => (
                    <option key={c._id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Tagline *</label>
                <input
                  required
                  type="text"
                  value={form.tagline}
                  onChange={(e) => set("tagline", e.target.value)}
                  className={inputCls}
                  placeholder="Short, compelling headline"
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Short Description *</label>
                <input
                  required
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => set("shortDescription", e.target.value)}
                  className={inputCls}
                  placeholder="1–2 sentence summary used on cards"
                />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Full Description *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={inputCls + " resize-none"}
                  placeholder="Detailed description shown on the product page"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider mb-4">
              Image
            </h2>
            <ImageField value={form.image} onChange={(url) => set("image", url)} />
          </div>

          {/* Arrays */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Content & Details
            </h2>
            <ArrayInput
              label="How It Works"
              items={form.howItWorks}
              onChange={(v) => set("howItWorks", v)}
              placeholder="Step description"
            />
            <ArrayInput
              label="Benefits"
              items={form.benefits}
              onChange={(v) => set("benefits", v)}
              placeholder="Benefit"
            />
            <ArrayInput
              label="Active Ingredients"
              items={form.ingredients}
              onChange={(v) => set("ingredients", v)}
              placeholder="e.g. Semaglutide 0.25mg"
            />
            <ArrayInput
              label="Side Effects"
              items={form.sideEffects}
              onChange={(v) => set("sideEffects", v)}
              placeholder="e.g. Nausea"
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider mb-4">
              FAQs
            </h2>
            <FAQInput faqs={form.faqs} onChange={(v) => set("faqs", v)} />
          </div>
        </div>

        {/* Right Column — Pricing & Settings */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Pricing
            </h2>
            <div>
              <label className={labelCls}>Price *</label>
              <input
                required
                type="number"
                min={0}
                step={0.01}
                value={form.price}
                onChange={(e) => set("price", parseFloat(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Price Unit *</label>
              <input
                required
                type="text"
                value={form.priceUnit}
                onChange={(e) => set("priceUnit", e.target.value)}
                className={inputCls}
                placeholder="month, week, dose…"
              />
            </div>
            <div>
              <label className={labelCls}>Original Price (optional)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.originalPrice}
                onChange={(e) =>
                  set("originalPrice", e.target.value === "" ? "" : parseFloat(e.target.value))
                }
                className={inputCls}
                placeholder="Leave blank if no sale"
              />
            </div>
          </div>

          {/* Stock & Status */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Stock & Status
            </h2>
            <div>
              <label className={labelCls}>Stock Count</label>
              <input
                type="number"
                min={0}
                value={form.stockCount}
                onChange={(e) => set("stockCount", parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
            <div className="space-y-3">
              {[
                { key: "inStock", label: "In Stock" },
                { key: "featured", label: "Featured" },
                { key: "prescriptionRequired", label: "Prescription Required" },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form[key as keyof ProductFormData] as boolean}
                    onChange={(e) => set(key as keyof ProductFormData, e.target.checked)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Badge (optional)
            </h2>
            <div>
              <label className={labelCls}>Badge Text</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                className={inputCls}
                placeholder="e.g. Best Seller"
              />
            </div>
            <div>
              <label className={labelCls}>Badge Color</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {BADGE_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("badgeColor", c)}
                    className={`w-8 h-8 rounded-full ${c} ring-offset-1 transition-all ${
                      form.badgeColor === c ? "ring-2 ring-gray-700" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
              Ratings
            </h2>
            <div>
              <label className={labelCls}>Rating (0–5)</label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={form.rating}
                onChange={(e) => set("rating", parseFloat(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Review Count</label>
              <input
                type="number"
                min={0}
                value={form.reviewCount}
                onChange={(e) => set("reviewCount", parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
