export const dynamic = 'force-dynamic';

import { getAllProducts, getAllCategories } from "@/lib/data";
import ProductsClient from "@/components/products/ProductsClient";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Treatments</h1>
          <p className="text-gray-500 mt-2 text-lg max-w-2xl">
            FDA-approved, physician-prescribed treatments — delivered to your door.
          </p>
        </div>
      </div>

      <ProductsClient products={products} categories={categories} />
    </div>
  );
}
