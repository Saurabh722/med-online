import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Telehealth reimagined — online, fast, private
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Better health,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                delivered
              </span>{" "}
              to your door
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mt-6 leading-relaxed max-w-xl">
              Consult with licensed physicians online. Get FDA-approved prescriptions for weight loss, men&apos;s health, women&apos;s health, skincare, and more — without the waiting room.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/get-started"
                className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-full text-center transition-colors shadow-lg shadow-teal-500/30"
              >
                Start Your Evaluation
              </Link>
              <Link
                href="/products"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-center transition-colors border border-white/20"
              >
                Browse Treatments
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
              {/* Avatar stack */}
              <div className="flex -space-x-2">
                {["bg-emerald-500", "bg-blue-500", "bg-rose-500", "bg-amber-500", "bg-purple-500"].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-gray-800 flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {["S", "J", "R", "D", "P"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Trusted by <span className="text-white font-semibold">500,000+</span> patients
                </p>
              </div>
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { title: "Weight Loss", icon: "⚖️", stat: "15% avg body weight loss", color: "from-emerald-500/20 to-teal-500/20", border: "border-emerald-500/30", slug: "weight-loss" },
              { title: "Men's Health", icon: "💪", stat: "90% patient satisfaction", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/30", slug: "mens-health" },
              { title: "Women's Health", icon: "🌸", stat: "Personalized care plans", color: "from-rose-500/20 to-pink-500/20", border: "border-rose-500/30", slug: "womens-health" },
              { title: "Skincare", icon: "✨", stat: "Dermatologist-formulated", color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/30", slug: "skincare" },
            ].map((card) => (
              <Link
                key={card.title}
                href={`/categories/${card.slug}`}
                className={`group bg-gradient-to-br ${card.color} border ${card.border} rounded-2xl p-5 hover:scale-105 transition-transform duration-300 cursor-pointer`}
              >
                <span className="text-3xl">{card.icon}</span>
                <h3 className="text-white font-bold mt-3 text-lg">{card.title}</h3>
                <p className="text-gray-300 text-xs mt-1">{card.stat}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
