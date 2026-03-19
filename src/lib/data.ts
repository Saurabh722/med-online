/**
 * Data access layer — all DB queries go through here.
 * Server-side only (called from Server Components / generateStaticParams).
 */
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Testimonial from "@/models/Testimonial";
import SiteConfig from "@/models/SiteConfig";
import type {
  ProductData,
  CategoryData,
  TestimonialData,
  SiteConfigData,
} from "@/types";

// ─── Products ────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<ProductData[]> {
  await connectDB();
  const docs = await Product.find({}).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getFeaturedProducts(): Promise<ProductData[]> {
  await connectDB();
  const docs = await Product.find({ featured: true }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getProductBySlug(slug: string): Promise<ProductData | null> {
  await connectDB();
  const doc = await Product.findOne({ slug }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getProductsByCategory(categoryId: string): Promise<ProductData[]> {
  await connectDB();
  const docs = await Product.find({ category: categoryId }).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getAllProductSlugs(): Promise<{ slug: string }[]> {
  await connectDB();
  const docs = await Product.find({}, { slug: 1, _id: 0 }).lean();
  return docs.map((d) => ({ slug: d.slug }));
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<CategoryData[]> {
  await connectDB();
  const docs = await Category.find({}).lean();
  return JSON.parse(JSON.stringify(docs));
}

export async function getCategoryBySlug(slug: string): Promise<CategoryData | null> {
  await connectDB();
  const doc = await Category.findOne({ slug }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

export async function getAllCategorySlugs(): Promise<{ category: string }[]> {
  await connectDB();
  const docs = await Category.find({}, { slug: 1, _id: 0 }).lean();
  return docs.map((d) => ({ category: d.slug }));
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getAllTestimonials(): Promise<TestimonialData[]> {
  await connectDB();
  const docs = await Testimonial.find({}).lean();
  return JSON.parse(JSON.stringify(docs));
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfigData | null> {
  await connectDB();
  const doc = await SiteConfig.findOne({ key: "main" }).lean();
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}
