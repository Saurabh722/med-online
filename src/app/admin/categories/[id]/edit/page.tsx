import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import CategoryForm from "@/components/admin/CategoryForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const doc = await Category.findById(id).lean();
  if (!doc) notFound();
  const category = JSON.parse(JSON.stringify(doc));
  return <CategoryForm category={category} />;
}
