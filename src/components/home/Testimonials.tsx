import { getAllTestimonials } from "@/lib/data";

export default async function Testimonials() {
  const testimonials = await getAllTestimonials();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Real Patients</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Thousands of lives changed
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            Don&apos;t take our word for it — hear from patients who transformed their health.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 hover:border-teal-100 hover:bg-teal-50/30 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    className={`w-4 h-4 ${s <= t.rating ? "text-amber-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Result pill */}
              <div className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                <span className="text-xs font-semibold text-teal-700">{t.result}</span>
              </div>

              {/* User */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                <div
                  className={`w-9 h-9 ${t.avatarColor} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}, {t.age}</p>
                  <p className="text-xs text-gray-500">{t.product} patient</p>
                </div>
                {t.verified && (
                  <div className="ml-auto">
                    <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
