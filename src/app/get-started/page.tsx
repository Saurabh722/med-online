export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getAllCategories } from "@/lib/data";

export default async function GetStartedPage() {
  const categories = await getAllCategories();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            What are you looking to treat?
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Choose a treatment category to begin your personalized health evaluation.
          </p>
        </div>
      </div>

      {/* Category Selection */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-5 hover:border-teal-300 hover:shadow-md transition-all duration-200"
            >
              <div className={`w-14 h-14 ${cat.bgColor} rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg">{cat.name}</h3>
                <p className="text-gray-500 text-sm mt-0.5 line-clamp-2">{cat.description}</p>
                <span className={`text-xs font-medium ${cat.textColor} mt-1 inline-block`}>
                  {cat.productCount} treatments →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust footer */}
        <div className="mt-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["Free evaluation", "Licensed physicians", "HIPAA compliant", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
