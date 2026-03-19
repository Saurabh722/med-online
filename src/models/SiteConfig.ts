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

interface ISiteLink {
  label: string;
  href: string;
}

export interface ISiteConfig extends Document {
  key: string;
  steps: IStep[];
  stats: IStat[];
  trustBadges: ITrustBadge[];
  navigation: {
    categories: INavCategory[];
  };
  appearance: {
    logo: { letter: string; primaryText: string; accentText: string };
    meta: { title: string; description: string; keywords: string };
    header: { ctaLinks: ISiteLink[]; ctaButton: ISiteLink };
    footer: {
      description: string;
      companyLinks: ISiteLink[];
      supportLinks: ISiteLink[];
      copyright: string;
    };
  };
}

const linkSchema = { label: String, href: String, _id: false };

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    key: { type: String, required: true, unique: true },
    steps: [{ step: Number, title: String, description: String, icon: String, _id: false }],
    stats: [{ value: String, label: String, _id: false }],
    trustBadges: [{ title: String, description: String, _id: false }],
    navigation: {
      categories: [{ name: String, slug: String, _id: false }],
    },
    appearance: {
      logo: { letter: String, primaryText: String, accentText: String },
      meta: { title: String, description: String, keywords: String },
      header: {
        ctaLinks: [linkSchema],
        ctaButton: { label: String, href: String, _id: false },
      },
      footer: {
        description: String,
        companyLinks: [linkSchema],
        supportLinks: [linkSchema],
        copyright: String,
      },
    },
  },
  { timestamps: true }
);

const SiteConfig: Model<ISiteConfig> =
  mongoose.models.SiteConfig ??
  mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);

export default SiteConfig;
