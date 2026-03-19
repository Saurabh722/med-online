import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  id: number;
  name: string;
  age: number;
  category: string;
  product: string;
  rating: number;
  quote: string;
  result: string;
  avatar: string;
  avatarColor: string;
  verified: boolean;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    category: { type: String, required: true },
    product: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    quote: { type: String, required: true },
    result: { type: String, required: true },
    avatar: { type: String, required: true },
    avatarColor: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial ??
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
