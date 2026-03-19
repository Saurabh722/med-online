import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-600 to-emerald-700 relative overflow-hidden">
      {/* Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Your health journey starts with one conversation
        </h2>
        <p className="text-teal-100 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
          Complete a free online evaluation in 5 minutes. A licensed physician will review your case and, if appropriate, prescribe the right treatment for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/get-started"
            className="px-8 py-4 bg-white text-teal-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl"
          >
            Get Started — It&apos;s Free
          </Link>
          <Link
            href="/products"
            className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors"
          >
            Browse Treatments
          </Link>
        </div>
        <p className="text-teal-200 text-sm mt-5">
          No insurance required · Free discreet shipping · Cancel anytime
        </p>
      </div>
    </section>
  );
}
