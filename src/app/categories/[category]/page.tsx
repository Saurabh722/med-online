import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getProductsByCategory,
  getAllCategories,
} from "@/lib/data";
import ProductCard, { type ProductCardProps } from "@/components/products/ProductCard";

interface Props {
  params: Promise<{ category: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    return await getAllCategorySlugs();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} Treatments — MedOnline`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getAllCategories(),
  ]);
  if (!category) notFound();

  const categoryProducts = await getProductsByCategory(category.id);
  const otherCategories = allCategories.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Treatments</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{category.icon}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {category.name}
          </h1>
          <p className="text-gray-300 text-xl mt-3 max-w-xl">
            {category.description}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-teal-400 rounded-full" />
            {categoryProducts.length} treatments available
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryProducts.length > 0 ? (
          <>
            <p className="text-gray-500 text-sm mb-8">
              Showing all <span className="font-semibold text-gray-900">{categoryProducts.length}</span> treatments in {category.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} {...(product as unknown as ProductCardProps)} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No treatments available in this category yet.</p>
            <Link href="/products" className="mt-4 inline-block text-teal-600 font-semibold hover:underline">
              Browse all treatments
            </Link>
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore other treatments</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherCategories
              .map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className={`${cat.bgColor} ${cat.textColor} rounded-xl p-4 text-center hover:opacity-80 transition-opacity`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <p className="text-sm font-semibold">{cat.name}</p>
                  <p className="text-xs opacity-70 mt-0.5">{cat.productCount} treatments</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
