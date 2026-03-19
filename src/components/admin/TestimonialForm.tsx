"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TestimonialFormData {
  _id?: string;
  id: number;
  name: string;
  age: number;
  category: string;
  product: string;
  rating: number;
  quote: string;
  result: string;
  avatar: string;
  avatarColor: string;
  verified: boolean;
}

interface Props {
  testimonial?: TestimonialFormData;
}

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

const AVATAR_COLORS = [
  "bg-teal-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-red-500",
  "bg-indigo-500",
];

export default function TestimonialForm({ testimonial }: Props) {
  const isEdit = !!testimonial;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<TestimonialFormData>({
    id: testimonial?.id ?? Date.now(),
    name: testimonial?.name ?? "",
    age: testimonial?.age ?? 30,
    category: testimonial?.category ?? "",
    product: testimonial?.product ?? "",
    rating: testimonial?.rating ?? 5,
    quote: testimonial?.quote ?? "",
    result: testimonial?.result ?? "",
    avatar: testimonial?.avatar ?? "",
    avatarColor: testimonial?.avatarColor ?? "bg-teal-500",
    verified: testimonial?.verified ?? true,
  });

  const set = (key: keyof TestimonialFormData, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const url = isEdit
      ? `/api/admin/testimonials/${testimonial!._id}`
      : "/api/admin/testimonials";
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Auto-set initials as avatar when name changes
  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      avatar: prev.avatar && prev.avatar !== getInitials(prev.name) ? prev.avatar : getInitials(name),
    }));
  };

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Testimonial" : "New Testimonial"}
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Testimonial"}
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
            Patient Info
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelCls}>Full Name *</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={inputCls}
                placeholder="e.g. Sarah M."
              />
            </div>
            <div>
              <label className={labelCls}>Age *</label>
              <input
                required
                type="number"
                min={18}
                max={120}
                value={form.age}
                onChange={(e) => set("age", parseInt(e.target.value) || 30)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Rating (1–5) *</label>
              <select
                value={form.rating}
                onChange={(e) => set("rating", parseInt(e.target.value))}
                className={inputCls}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {"★".repeat(r)}{"☆".repeat(5 - r)} ({r}/5)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Category *</label>
              <input
                required
                type="text"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
                placeholder="e.g. weight-loss"
              />
            </div>
            <div>
              <label className={labelCls}>Product *</label>
              <input
                required
                type="text"
                value={form.product}
                onChange={(e) => set("product", e.target.value)}
                className={inputCls}
                placeholder="e.g. Semaglutide"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
            Review Content
          </h2>
          <div>
            <label className={labelCls}>Quote *</label>
            <textarea
              required
              rows={4}
              value={form.quote}
              onChange={(e) => set("quote", e.target.value)}
              className={inputCls + " resize-none"}
              placeholder="Patient's testimonial text…"
            />
          </div>
          <div>
            <label className={labelCls}>Result Highlight *</label>
            <input
              required
              type="text"
              value={form.result}
              onChange={(e) => set("result", e.target.value)}
              className={inputCls}
              placeholder="e.g. Lost 22 lbs in 3 months"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) => set("verified", e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">Verified patient</span>
          </label>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wider">
            Avatar
          </h2>
          <div>
            <label className={labelCls}>Initials / Avatar Text</label>
            <input
              type="text"
              maxLength={2}
              value={form.avatar}
              onChange={(e) => set("avatar", e.target.value.toUpperCase())}
              className={inputCls}
              placeholder="e.g. SM"
            />
          </div>
          <div>
            <label className={labelCls}>Avatar Color</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("avatarColor", c)}
                  className={`w-9 h-9 rounded-full ${c} ring-offset-1 transition-all flex items-center justify-center text-white text-xs font-bold ${
                    form.avatarColor === c ? "ring-2 ring-gray-700" : ""
                  }`}
                >
                  {form.avatar || "?"}
                </button>
              ))}
            </div>
          </div>
          {/* Preview */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${form.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}
              >
                {form.avatar || "?"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {form.name || "Patient Name"}, {form.age}
                </p>
                <p className="text-xs text-gray-500">{form.product || "Product"} patient</p>
              </div>
            </div>
            {form.quote && (
              <blockquote className="mt-3 text-sm text-gray-600 italic">"{form.quote}"</blockquote>
            )}
            {form.result && (
              <p className="mt-2 text-xs font-semibold text-teal-700">✓ {form.result}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
