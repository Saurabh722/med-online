"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Testimonial {
  _id: string;
  name: string;
  age: number;
  product: string;
  rating: number;
  result: string;
  avatar: string;
  avatarColor: string;
  verified: boolean;
}

export default function AdminTestimonialsPage() {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then(setTestimonials)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    setDeleting(id);
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-0.5">{testimonials.length} total</p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
        >
          + New Testimonial
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 animate-pulse"
                >
                  <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              ))
          : testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
              >
                <div
                  className={`w-10 h-10 ${t.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">
                      {t.name}, {t.age}
                    </span>
                    <span className="text-amber-400 text-xs">
                      {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                    </span>
                    {t.verified && (
                      <span className="text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{t.product} patient</p>
                  <p className="text-sm text-teal-700 font-medium mt-1">✓ {t.result}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => router.push(`/admin/testimonials/${t._id}/edit`)}
                    className="text-teal-600 hover:text-teal-700 font-medium text-xs px-2 py-1 rounded hover:bg-teal-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id, t.name)}
                    disabled={deleting === t._id}
                    className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deleting === t._id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
        {!loading && testimonials.length === 0 && (
          <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">
            No testimonials yet.{" "}
            <Link href="/admin/testimonials/new" className="text-teal-600 font-medium">
              Add the first one.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
