"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  priceUnit: string;
  stockCount: number;
  inStock: boolean;
  featured: boolean;
  image: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-0.5">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
        >
          + New Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i}>
                        <td colSpan={7} className="px-6 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                : products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          {p.image && (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0 bg-gray-100"
                            />
                          )}
                          <span className="font-medium text-gray-900 line-clamp-1">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-gray-500 capitalize">{p.category}</td>
                      <td className="px-6 py-3 text-gray-700">
                        ${p.price}/{p.priceUnit}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={
                            p.stockCount <= 5 && p.inStock
                              ? "text-amber-600 font-semibold"
                              : "text-gray-700"
                          }
                        >
                          {p.stockCount}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            p.inStock
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {p.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/admin/products/${p._id}/edit`)}
                            className="text-teal-600 hover:text-teal-700 font-medium text-xs px-2 py-1 rounded hover:bg-teal-50 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p._id, p.name)}
                            disabled={deleting === p._id}
                            className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {deleting === p._id ? "…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!loading && products.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No products yet.{" "}
              <Link href="/admin/products/new" className="text-teal-600 font-medium">
                Add the first one.
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
