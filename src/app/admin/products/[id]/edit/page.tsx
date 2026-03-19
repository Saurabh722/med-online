export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { getAllCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const doc = await Product.findById(id).lean();
  if (!doc) notFound();

  const product = JSON.parse(JSON.stringify(doc));
  const categories = await getAllCategories();

  return <ProductForm product={product} categories={categories} />;
}
