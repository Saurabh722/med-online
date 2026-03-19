import mongoose, { Schema, Document, Model } from "mongoose";

interface IStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface IStat {
  value: string;
  label: string;
}

interface ITrustBadge {
  title: string;
  description: string;
}

interface INavCategory {
  name: string;
  slug: string;
}

export interface ISiteConfig extends Document {
  key: string;
  steps: IStep[];
  stats: IStat[];
  trustBadges: ITrustBadge[];
  navigation: {
    categories: INavCategory[];
  };
}

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    key: { type: String, required: true, unique: true },
    steps: [
      {
        step: Number,
        title: String,
        description: String,
        icon: String,
        _id: false,
      },
    ],
    stats: [{ value: String, label: String, _id: false }],
    trustBadges: [{ title: String, description: String, _id: false }],
    navigation: {
      categories: [{ name: String, slug: String, _id: false }],
    },
  },
  { timestamps: true }
);

const SiteConfig: Model<ISiteConfig> =
  mongoose.models.SiteConfig ??
  mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);

export default SiteConfig;
