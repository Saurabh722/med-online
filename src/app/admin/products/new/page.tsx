export const dynamic = 'force-dynamic';

import { getAllCategories } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getAllCategories();
  return <ProductForm categories={categories} />;
}
