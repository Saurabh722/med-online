export interface FAQ {
  question: string;
  answer: string;
}

export interface ProductData {
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
  faqs: FAQ[];
  stockCount: number;
}

export interface CategoryData {
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

export interface TestimonialData {
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

export interface SiteStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface SiteStat {
  value: string;
  label: string;
}

export interface TrustBadge {
  title: string;
  description: string;
}

export interface NavCategory {
  name: string;
  slug: string;
}

export interface SiteLink {
  label: string;
  href: string;
}

export interface AppearanceConfig {
  logo: {
    letter: string;
    primaryText: string;
    accentText: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  header: {
    ctaLinks: SiteLink[];
    ctaButton: SiteLink;
  };
  footer: {
    description: string;
    companyLinks: SiteLink[];
    supportLinks: SiteLink[];
    copyright: string;
  };
}

export interface SiteConfigData {
  key: string;
  steps: SiteStep[];
  stats: SiteStat[];
  trustBadges: TrustBadge[];
  navigation: {
    categories: NavCategory[];
  };
  appearance?: AppearanceConfig;
}
