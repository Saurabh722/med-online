import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  textColor: string;
  image: string;
  productCount: number;
  featured: boolean;
}

const CategorySchema = new Schema<ICategory>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    bgColor: { type: String, required: true },
    textColor: { type: String, required: true },
    image: { type: String, required: true },
    productCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  mongoose.models.Category ?? mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
