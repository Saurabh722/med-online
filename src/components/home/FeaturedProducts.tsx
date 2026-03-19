import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import type { ProductData } from "@/types";

export default async function FeaturedProducts() {
  let featured: ProductData[] = [];
  try {
    featured = (await getFeaturedProducts()).slice(0, 6);
  } catch {
    // DB unavailable — render empty section
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Featured</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Most popular treatments
            </h2>
            <p className="text-gray-500 mt-2 max-w-lg">
              Trusted by hundreds of thousands of patients. Physician-prescribed and pharmacy-dispensed.
            </p>
          </div>
          <Link
            href="/products"
            className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors flex items-center gap-1 shrink-0"
          >
            Browse all products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
