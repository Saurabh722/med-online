"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  products: number;
  categories: number;
  testimonials: number;
  outOfStock: number;
  lowStock: number;
}

interface RecentProduct {
  _id: string;
  name: string;
  category: string;
  price: number;
  priceUnit: string;
  stockCount: number;
  inStock: boolean;
}

const QUICK_LINKS = [
  { href: "/admin/products/new", label: "Add Product", color: "bg-teal-600 hover:bg-teal-700" },
  { href: "/admin/categories/new", label: "Add Category", color: "bg-indigo-600 hover:bg-indigo-700" },
  { href: "/admin/testimonials/new", label: "Add Testimonial", color: "bg-purple-600 hover:bg-purple-700" },
  { href: "/admin/site-config", label: "Edit Site Config", color: "bg-amber-500 hover:bg-amber-600" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentProduct[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
      fetch("/api/admin/testimonials").then((r) => r.json()),
    ]).then(([products, categories, testimonials]) => {
      const outOfStock = products.filter((p: RecentProduct) => !p.inStock).length;
      const lowStock = products.filter(
        (p: RecentProduct) => p.inStock && p.stockCount <= 5
      ).length;
      setStats({
        products: products.length,
        categories: categories.length,
        testimonials: testimonials.length,
        outOfStock,
        lowStock,
      });
      setRecent(products.slice(0, 6));
    });
  }, []);

  const statCards = stats
    ? [
        { label: "Total Products", value: stats.products, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Categories", value: stats.categories, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Testimonials", value: stats.testimonials, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Out of Stock", value: stats.outOfStock, color: "text-red-600", bg: "bg-red-50" },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats
          ? statCards.map((card) => (
              <div key={card.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
                <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
              </div>
            ))
          : Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 animate-pulse">
                  <div className="h-3 bg-gray-100 rounded w-2/3 mb-3" />
                  <div className="h-8 bg-gray-100 rounded w-1/3" />
                </div>
              ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {QUICK_LINKS.map(({ href, label, color }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 ${color} text-white text-sm font-medium rounded-lg transition-colors`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Recent Products
          </h2>
          <Link href="/admin/products" className="text-teal-600 text-sm font-medium hover:text-teal-700">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recent.length === 0
                ? Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i}>
                        <td colSpan={6} className="px-6 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse" />
                        </td>
                      </tr>
                    ))
                : recent.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-900">{p.name}</td>
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
                        <Link
                          href={`/admin/products/${p._id}/edit`}
                          className="text-teal-600 hover:text-teal-700 font-medium"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
