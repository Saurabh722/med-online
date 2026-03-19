import Link from "next/link";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  price: number;
  priceUnit: string;
  originalPrice?: number;
  image: string;
  badge?: string | null;
  badgeColor?: string | null;
  rating: number;
  reviewCount: number;
  prescriptionRequired: boolean;
}

export default function ProductCard({
  name,
  slug,
  shortDescription,
  price,
  priceUnit,
  originalPrice,
  image,
  badge,
  badgeColor,
  rating,
  reviewCount,
  prescriptionRequired,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <span
            className={`absolute top-3 left-3 ${badgeColor ?? "bg-teal-500"} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
          >
            {badge}
          </span>
        )}
        {prescriptionRequired && (
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full border border-gray-200">
            Rx Required
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-teal-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {rating} ({reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-gray-900">${price}</span>
            <span className="text-sm text-gray-500">/{priceUnit}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
            )}
          </div>
          <span className="text-sm font-semibold text-teal-600 group-hover:text-teal-700">
            Start →
          </span>
        </div>
      </div>
    </Link>
  );
}
