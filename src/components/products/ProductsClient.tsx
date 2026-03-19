"use client";

import { useState } from "react";
import ProductCard from "@/components/products/ProductCard";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  price: number;
  priceUnit: string;
  originalPrice?: number;
  image: string;
  badge?: string | null;
  badgeColor?: string | null;
  rating: number;
  reviewCount: number;
  prescriptionRequired: boolean;
  featured: boolean;
}

interface Props {
  products: Product[];
  categories: Category[];
}

export default function ProductsClient({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const filtered = products
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="featured">Sort: Featured</option>
          <option value="rating">Sort: Highest Rated</option>
          <option value="price-asc">Sort: Price Low → High</option>
          <option value="price-desc">Sort: Price High → Low</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        Showing <span className="font-semibold text-gray-900">{filtered.length}</span> treatments
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No treatments found in this category.</p>
        </div>
      )}
    </div>
  );
}
