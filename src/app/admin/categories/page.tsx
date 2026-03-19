"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  featured: boolean;
  bgColor: string;
  textColor: string;
}

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-0.5">{categories.length} total</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
        >
          + New Category
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Slug</th>
              <th className="px-6 py-3 text-left">Products</th>
              <th className="px-6 py-3 text-left">Featured</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="px-6 py-4">
                        <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
              : categories.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${c.bgColor}`}
                      >
                        <span>{c.icon}</span>
                        <span className={`font-medium text-sm ${c.textColor}`}>{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500 font-mono text-xs">{c.slug}</td>
                    <td className="px-6 py-3 text-gray-700">{c.productCount}</td>
                    <td className="px-6 py-3">
                      {c.featured && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/admin/categories/${c._id}/edit`)}
                          className="text-teal-600 hover:text-teal-700 font-medium text-xs px-2 py-1 rounded hover:bg-teal-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id, c.name)}
                          disabled={deleting === c._id}
                          className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {deleting === c._id ? "…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!loading && categories.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No categories yet.{" "}
            <Link href="/admin/categories/new" className="text-teal-600 font-medium">
              Add the first one.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
