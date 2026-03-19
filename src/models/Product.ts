import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  priceUnit: string;
  originalPrice?: number;
  image: string;
  images: string[];
  badge?: string;
  badgeColor?: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  prescriptionRequired: boolean;
  howItWorks: string[];
  benefits: string[];
  ingredients: string[];
  sideEffects: string[];
  faqs: IFAQ[];
  stockCount: number;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    priceUnit: { type: String, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    images: [{ type: String }],
    badge: { type: String },
    badgeColor: { type: String },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    prescriptionRequired: { type: Boolean, default: false },
    howItWorks: [{ type: String }],
    benefits: [{ type: String }],
    ingredients: [{ type: String }],
    sideEffects: [{ type: String }],
    faqs: [FAQSchema],
    stockCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Index for fast lookups (slug already indexed via unique:true in schema)
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });

const Product: Model<IProduct> =
  mongoose.models.Product ?? mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
