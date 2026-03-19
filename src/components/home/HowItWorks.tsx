import Link from "next/link";
import { getSiteConfig } from "@/lib/data";

export default async function HowItWorks() {
  let siteData = null;
  try {
    siteData = await getSiteConfig();
  } catch {
    // DB unavailable — render empty section
  }
  const steps = siteData?.steps ?? [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Healthcare that actually fits your life
          </h2>
          <p className="text-gray-500 mt-3 text-lg">
            From your first online evaluation to ongoing care — we make it seamless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-teal-100 z-0" />

          {steps.map((step) => (
            <div key={step.step} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white border-2 border-teal-100 rounded-2xl flex flex-col items-center justify-center shadow-sm mb-4">
                <span className="text-3xl">{step.icon}</span>
              </div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
                Step {step.step}
              </span>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors shadow-md shadow-teal-200"
          >
            Get Started Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
