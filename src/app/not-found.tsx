import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="text-7xl mb-6">🏥</div>
      <h1 className="text-4xl font-extrabold text-gray-900">Page not found</h1>
      <p className="text-gray-500 mt-3 text-lg max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-3 mt-8">
        <Link
          href="/"
          className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          Browse Treatments
        </Link>
      </div>
    </div>
  );
}
