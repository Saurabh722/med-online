import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProductSlugs,
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";
import ProductCard, { type ProductCardProps } from "@/components/products/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    return await getAllProductSlugs();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — MedOnline`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.category);
  const relatedProductsAll = await getProductsByCategory(product.category);
  const relatedProducts = relatedProductsAll
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-teal-600 transition-colors">Products</Link>
            <span>/</span>
            {category && (
              <>
                <Link href={`/categories/${category.slug}`} className="hover:text-teal-600 transition-colors">
                  {category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span className={`absolute top-4 left-4 ${product.badgeColor ?? "bg-teal-500"} text-white text-sm font-semibold px-3 py-1.5 rounded-full`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24">
            {/* Category tag */}
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${category.textColor} ${category.bgColor} px-3 py-1 rounded-full mb-4`}
              >
                <span>{category.icon}</span>
                {category.name}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-gray-500 text-lg mt-2">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className={`w-5 h-5 ${s <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-gray-900">{product.rating}</span>
              <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6 pb-6 border-b border-gray-100">
              <span className="text-4xl font-extrabold text-gray-900">${product.price}</span>
              <span className="text-gray-500 text-lg">/{product.priceUnit}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-xl">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 mt-6">
              <Link
                href="/get-started"
                className="w-full py-4 bg-teal-600 text-white font-bold text-lg rounded-full text-center hover:bg-teal-700 transition-colors shadow-md shadow-teal-200"
              >
                Start Treatment — ${product.price}/{product.priceUnit}
              </Link>
              <p className="text-center text-xs text-gray-400">
                {product.prescriptionRequired
                  ? "Prescription required · Physician review included · Cancel anytime"
                  : "No prescription required · Free discreet shipping · Cancel anytime"}
              </p>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-2.5">
              {product.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Tabs Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* How It Works */}
          <div className="bg-teal-50 rounded-2xl p-7">
            <h2 className="text-xl font-bold text-gray-900 mb-5">How it works</h2>
            <ol className="space-y-4">
              {product.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-teal-600 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Description + Ingredients */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this treatment</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Active ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Possible side effects</h3>
              <div className="flex flex-wrap gap-2">
                {product.sideEffects.map((se, i) => (
                  <span key={i} className="bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-full border border-red-100">
                    {se}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
            <div className="space-y-4">
              {product.faqs.map((faq, i) => (
                <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-900 text-sm list-none hover:bg-gray-50">
                    {faq.question}
                    <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More in {category?.name ?? "this category"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} {...(p as unknown as ProductCardProps)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
