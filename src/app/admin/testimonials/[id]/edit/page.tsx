import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import TestimonialForm from "@/components/admin/TestimonialForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  await connectDB();
  const doc = await Testimonial.findById(id).lean();
  if (!doc) notFound();
  const testimonial = JSON.parse(JSON.stringify(doc));
  return <TestimonialForm testimonial={testimonial} />;
}
