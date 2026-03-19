import Link from "next/link";
import { getAllCategories } from "@/lib/data";

export default async function Categories() {
  let categories: Awaited<ReturnType<typeof getAllCategories>> = [];
  try {
    categories = await getAllCategories();
  } catch {
    // DB unavailable — render empty section
  }
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Treatment Areas</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              What do you need help with?
            </h2>
          </div>
          <Link
            href="/products"
            className="text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors flex items-center gap-1 shrink-0"
          >
            View all treatments
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 h-52 flex items-end p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-50 transition-opacity duration-300"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

              {/* Content */}
              <div className="relative z-10 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{cat.icon}</span>
                      <h3 className="text-white font-bold text-xl">{cat.name}</h3>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-1">{cat.description}</p>
                  </div>
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-500 transition-colors shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <span className="mt-2 inline-block text-xs text-gray-400">
                  {cat.productCount} treatments
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
