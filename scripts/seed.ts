/**
 * Seed script — run once to populate MongoDB with the initial data.
 * Usage: npx tsx scripts/seed.ts
 */
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not set in .env.local");
  process.exit(1);
}

// ─── Raw Data ─────────────────────────────────────────────────────────────────

const categoriesData = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    slug: "weight-loss",
    description: "Science-backed treatments to help you reach and maintain a healthy weight.",
    icon: "⚖️",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    productCount: 6,
    featured: true,
  },
  {
    id: "mens-health",
    name: "Men's Health",
    slug: "mens-health",
    description: "Treatments for erectile dysfunction, hair loss, testosterone, and more.",
    icon: "💪",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    productCount: 8,
    featured: true,
  },
  {
    id: "womens-health",
    name: "Women's Health",
    slug: "womens-health",
    description: "Personalized care for fertility, menopause, skin, and hormonal health.",
    icon: "🌸",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    productCount: 7,
    featured: true,
  },
  {
    id: "mental-health",
    name: "Mental Health",
    slug: "mental-health",
    description: "Online therapy, anxiety management, and depression treatment plans.",
    icon: "🧠",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    productCount: 5,
    featured: true,
  },
  {
    id: "skincare",
    name: "Skincare",
    slug: "skincare",
    description: "Prescription-strength treatments for acne, aging, and hyperpigmentation.",
    icon: "✨",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    productCount: 9,
    featured: false,
  },
  {
    id: "sleep",
    name: "Sleep",
    slug: "sleep",
    description: "Treatments to help you fall asleep faster and wake up refreshed.",
    icon: "😴",
    color: "from-slate-500 to-gray-600",
    bgColor: "bg-slate-50",
    textColor: "text-slate-700",
    image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&q=80",
    productCount: 4,
    featured: false,
  },
];

const productsData = [
  {
    id: "wegovy-semaglutide",
    name: "Wegovy (Semaglutide)",
    slug: "wegovy-semaglutide",
    category: "weight-loss",
    tagline: "FDA-approved weekly injection for chronic weight management",
    description: "Wegovy (semaglutide) is an FDA-approved prescription medication for chronic weight management in adults. It works by mimicking a hormone that regulates appetite, helping you feel full sooner and reduce caloric intake.",
    shortDescription: "Weekly injection for significant, sustained weight loss",
    price: 299,
    priceUnit: "month",
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"],
    badge: "Most Popular",
    badgeColor: "bg-emerald-500",
    rating: 4.8,
    reviewCount: 2341,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Complete an online medical evaluation", "A licensed physician reviews your health history", "Prescription sent to a licensed pharmacy", "Medication delivered to your door"],
    benefits: ["Average 15% body weight loss in clinical trials", "Once-weekly injection", "Reduces cardiovascular risk factors", "FDA-approved for long-term use"],
    ingredients: ["Semaglutide 2.4 mg"],
    sideEffects: ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Stomach pain"],
    faqs: [
      { question: "How quickly will I see results?", answer: "Most patients begin to see results within the first 4 weeks, with significant weight loss typically occurring over 16-20 weeks of treatment." },
      { question: "Is Wegovy covered by insurance?", answer: "Many insurance plans cover Wegovy for eligible patients. Our team can help verify your coverage during the consultation process." },
      { question: "Do I need a prescription?", answer: "Yes, Wegovy requires a valid prescription from a licensed healthcare provider. Our online physicians can evaluate and prescribe if appropriate." },
    ],
  },
  {
    id: "ozempic-semaglutide",
    name: "Ozempic (Semaglutide 1mg)",
    slug: "ozempic-semaglutide",
    category: "weight-loss",
    tagline: "Originally for type 2 diabetes, widely used for weight management",
    description: "Ozempic is a once-weekly injectable medication originally approved for type 2 diabetes that has shown remarkable results for weight loss. It helps regulate blood sugar and reduces appetite.",
    shortDescription: "Once-weekly GLP-1 medication for weight and blood sugar control",
    price: 249,
    priceUnit: "month",
    originalPrice: 329,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"],
    badge: "Best Value",
    badgeColor: "bg-blue-500",
    rating: 4.7,
    reviewCount: 1876,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Complete a short health questionnaire", "Doctor review within 24 hours", "Prescription issued if appropriate", "Free discreet delivery"],
    benefits: ["Reduces appetite and cravings", "Improves blood sugar levels", "Once-weekly dosing", "Clinically proven results"],
    ingredients: ["Semaglutide 1 mg"],
    sideEffects: ["Nausea", "Abdominal pain", "Diarrhea", "Decreased appetite"],
    faqs: [
      { question: "What is the difference between Wegovy and Ozempic?", answer: "Both contain semaglutide, but Wegovy is FDA-approved specifically for weight loss at a higher dose (2.4mg), while Ozempic is approved for type 2 diabetes at lower doses (0.5–1mg)." },
      { question: "How is it administered?", answer: "Ozempic is injected once a week using a pre-filled pen, usually in the abdomen, thigh, or upper arm." },
    ],
  },
  {
    id: "sildenafil-ed",
    name: "Sildenafil (Generic Viagra)",
    slug: "sildenafil-ed",
    category: "mens-health",
    tagline: "The trusted ED treatment, now available online",
    description: "Sildenafil is the active ingredient in Viagra — the most prescribed ED medication in the world. It helps increase blood flow to achieve and maintain an erection.",
    shortDescription: "Same active ingredient as Viagra at a fraction of the cost",
    price: 49,
    priceUnit: "month",
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80"],
    badge: "Top Seller",
    badgeColor: "bg-blue-600",
    rating: 4.9,
    reviewCount: 5421,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Answer a few health questions online", "Physician reviews and prescribes", "Pills shipped in discreet packaging", "Take 30-60 min before activity"],
    benefits: ["Works in 30–60 minutes", "Effective for up to 4–6 hours", "Proven in millions of patients", "Same as brand Viagra, lower cost"],
    ingredients: ["Sildenafil Citrate 100mg"],
    sideEffects: ["Headache", "Flushing", "Upset stomach", "Nasal congestion", "Vision changes"],
    faqs: [
      { question: "Is it as effective as Viagra?", answer: "Yes. Sildenafil is the exact same active ingredient found in Viagra. Generic versions are FDA-approved and bioequivalent to the brand-name product." },
      { question: "How fast does it work?", answer: "Sildenafil typically starts working within 30–60 minutes. For best results, take it on an empty stomach." },
    ],
  },
  {
    id: "finasteride-hair-loss",
    name: "Finasteride (Hair Loss)",
    slug: "finasteride-hair-loss",
    category: "mens-health",
    tagline: "Clinically proven to stop hair loss and regrow hair",
    description: "Finasteride is an FDA-approved oral medication that prevents hair loss by blocking DHT, the hormone responsible for male pattern baldness.",
    shortDescription: "Daily pill that stops and reverses male pattern baldness",
    price: 25,
    priceUnit: "month",
    originalPrice: 50,
    image: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1559599746-8823b38544c6?w=600&q=80"],
    badge: null,
    badgeColor: null,
    rating: 4.6,
    reviewCount: 3102,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Complete health assessment", "Doctor evaluates and prescribes", "Daily pill delivered monthly", "See results in 3–6 months"],
    benefits: ["Stops hair loss in 83% of men", "Regrows hair in up to 66% of men", "Simple once-daily pill", "FDA-approved since 1997"],
    ingredients: ["Finasteride 1mg"],
    sideEffects: ["Decreased libido (rare)", "Erectile dysfunction (rare)", "Decreased ejaculate volume"],
    faqs: [
      { question: "When will I see results?", answer: "Most men see results within 3–6 months. Maximum results are typically seen after 12 months of consistent use." },
      { question: "What happens if I stop taking it?", answer: "If you stop taking finasteride, hair loss will resume and hair gained may be lost within 12 months." },
    ],
  },
  {
    id: "birth-control-pill",
    name: "Birth Control Pill",
    slug: "birth-control-pill",
    category: "womens-health",
    tagline: "Convenient online prescription for oral contraceptives",
    description: "Get a prescription for the birth control pill that's right for you, delivered to your door.",
    shortDescription: "Online prescription for your preferred oral contraceptive",
    price: 15,
    priceUnit: "month",
    originalPrice: 35,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"],
    badge: "Most Prescribed",
    badgeColor: "bg-rose-500",
    rating: 4.7,
    reviewCount: 8901,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Answer health questionnaire", "Physician evaluates and prescribes", "Delivered every month", "Switch pills anytime"],
    benefits: ["99% effective when taken correctly", "Regulates periods", "Reduces acne and cramps", "Multiple options available"],
    ingredients: ["Ethinyl estradiol / Norgestimate (varies by brand)"],
    sideEffects: ["Nausea", "Spotting", "Breast tenderness", "Mood changes"],
    faqs: [
      { question: "Which pill will I be prescribed?", answer: "Our physicians select the most appropriate pill based on your health history, preferences, and medical needs." },
      { question: "How quickly does it start working?", answer: "If you start on day 1 of your period, you're protected immediately." },
    ],
  },
  {
    id: "tretinoin-anti-aging",
    name: "Tretinoin Cream",
    slug: "tretinoin-anti-aging",
    category: "skincare",
    tagline: "The gold standard in anti-aging skincare",
    description: "Tretinoin is a prescription-strength retinoid that has been clinically proven to reduce fine lines, wrinkles, and hyperpigmentation.",
    shortDescription: "Prescription retinoid cream for anti-aging and acne",
    price: 35,
    priceUnit: "month",
    originalPrice: 75,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80"],
    badge: "Dermatologist Favorite",
    badgeColor: "bg-amber-500",
    rating: 4.8,
    reviewCount: 4231,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Complete skin assessment with photos", "Board-certified dermatologist reviews", "Custom-strength tretinoin prescribed", "Applied nightly before bed"],
    benefits: ["Reduces fine lines and wrinkles", "Fades dark spots and hyperpigmentation", "Treats and prevents acne", "Stimulates collagen production"],
    ingredients: ["Tretinoin 0.025% – 0.1%"],
    sideEffects: ["Redness", "Peeling", "Dryness", "Increased sun sensitivity"],
    faqs: [
      { question: "How long does it take to work?", answer: "Most patients see initial improvements within 6–12 weeks." },
      { question: "Can I use tretinoin if I have sensitive skin?", answer: "Yes, but we recommend starting with a lower concentration." },
    ],
  },
  {
    id: "anxiety-ssri",
    name: "Anxiety Treatment (SSRI)",
    slug: "anxiety-ssri",
    category: "mental-health",
    tagline: "Clinician-managed anxiety and depression treatment online",
    description: "Our mental health program pairs you with a licensed clinician who evaluates your symptoms and prescribes FDA-approved SSRIs or SNRIs.",
    shortDescription: "Online evaluation and prescription management for anxiety",
    price: 99,
    priceUnit: "month",
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"],
    badge: "Clinician Managed",
    badgeColor: "bg-purple-500",
    rating: 4.6,
    reviewCount: 1543,
    featured: false,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Complete anxiety assessment", "Video or async consultation with clinician", "Prescription sent to pharmacy", "Ongoing check-ins and support"],
    benefits: ["Board-certified mental health clinicians", "Evidence-based treatments", "Ongoing care and medication management", "Private and confidential"],
    ingredients: ["Sertraline / Escitalopram (varies by prescription)"],
    sideEffects: ["Nausea (initially)", "Insomnia", "Headache", "Dry mouth"],
    faqs: [
      { question: "Is this a replacement for therapy?", answer: "Medication can be very effective for anxiety and depression, but it works best in combination with therapy." },
      { question: "How quickly do SSRIs work?", answer: "SSRIs typically take 4–6 weeks to reach full effectiveness." },
    ],
  },
  {
    id: "melatonin-sleep",
    name: "Sleep Support Program",
    slug: "melatonin-sleep",
    category: "sleep",
    tagline: "Evidence-based sleep treatment including prescription options",
    description: "Our sleep program pairs you with a physician who can recommend behavioral changes, OTC sleep aids, or prescription sleep medications.",
    shortDescription: "Personalized sleep treatment from evaluation to prescription",
    price: 69,
    priceUnit: "month",
    originalPrice: 129,
    image: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=600&q=80"],
    badge: null,
    badgeColor: null,
    rating: 4.5,
    reviewCount: 876,
    featured: false,
    inStock: true,
    prescriptionRequired: false,
    howItWorks: ["Complete sleep quality assessment", "Physician reviews sleep patterns", "Personalized treatment plan created", "Follow-up to track improvements"],
    benefits: ["Tailored to your sleep issues", "Both OTC and Rx options", "Addresses root causes", "Includes sleep hygiene guidance"],
    ingredients: ["Melatonin / Trazodone / Zolpidem (varies)"],
    sideEffects: ["Drowsiness", "Dizziness (with prescription options)"],
    faqs: [
      { question: "What kind of medications might be prescribed?", answer: "Depending on your assessment, physicians may prescribe trazodone, zolpidem, or other evidence-based sleep aids." },
    ],
  },
  {
    id: "testosterone-therapy",
    name: "Testosterone Therapy",
    slug: "testosterone-therapy",
    category: "mens-health",
    tagline: "Restore energy, muscle, and drive with TRT",
    description: "Low testosterone affects millions of men and causes fatigue, decreased libido, muscle loss, and brain fog. TRT can help restore levels to a healthy range.",
    shortDescription: "Medically supervised testosterone replacement for low T",
    price: 149,
    priceUnit: "month",
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80"],
    badge: "New",
    badgeColor: "bg-green-500",
    rating: 4.7,
    reviewCount: 1234,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Order an at-home lab test kit", "Test results reviewed by a physician", "TRT prescribed if appropriate", "Injections or gel delivered monthly"],
    benefits: ["Increased energy and stamina", "Improved muscle mass and strength", "Enhanced libido and sexual function", "Better mood and mental clarity"],
    ingredients: ["Testosterone Cypionate / Enanthate (injectable or topical)"],
    sideEffects: ["Acne", "Fluid retention", "Sleep apnea (rare)", "Erythrocytosis"],
    faqs: [
      { question: "How do I know if I have low testosterone?", answer: "Common signs include fatigue, low libido, difficulty concentrating, and muscle loss. A blood test is the only way to confirm." },
      { question: "What forms of TRT are available?", answer: "We offer injectable testosterone cypionate and topical testosterone gel." },
    ],
  },
  {
    id: "menopause-hrt",
    name: "Menopause HRT",
    slug: "menopause-hrt",
    category: "womens-health",
    tagline: "Relief from hot flashes, night sweats, and mood changes",
    description: "Hormone Replacement Therapy (HRT) can significantly reduce the most disruptive symptoms of menopause.",
    shortDescription: "Personalized hormone therapy for menopause symptom relief",
    price: 89,
    priceUnit: "month",
    originalPrice: 169,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80"],
    badge: "Specialist Care",
    badgeColor: "bg-rose-500",
    rating: 4.8,
    reviewCount: 2109,
    featured: true,
    inStock: true,
    prescriptionRequired: true,
    howItWorks: ["Complete menopause symptom assessment", "OB-GYN physician reviews your profile", "Personalized HRT plan prescribed", "Medication delivered to your home"],
    benefits: ["Reduces hot flashes by up to 75%", "Improves sleep quality", "Restores hormonal balance", "Multiple delivery methods available"],
    ingredients: ["Estradiol / Progesterone (varies by formulation)"],
    sideEffects: ["Breast tenderness", "Nausea (initially)", "Spotting", "Bloating"],
    faqs: [
      { question: "Is HRT safe?", answer: "For most healthy women under 60 within 10 years of menopause, the benefits of HRT outweigh the risks." },
      { question: "What types of HRT do you offer?", answer: "We offer patches, gels, oral pills, and vaginal formulations." },
    ],
  },
];

const testimonialsData = [
  { id: 1, name: "Sarah M.", age: 38, category: "weight-loss", product: "Wegovy", rating: 5, quote: "I lost 42 pounds in 6 months. For the first time in years, I feel confident and energetic. The process was so easy — everything was done online.", result: "Lost 42 lbs in 6 months", avatar: "SM", avatarColor: "bg-emerald-500", verified: true },
  { id: 2, name: "James T.", age: 45, category: "mens-health", product: "Sildenafil", rating: 5, quote: "I was embarrassed to talk about ED with my regular doctor. Being able to do this online, privately, changed my life and my marriage.", result: "Restored confidence", avatar: "JT", avatarColor: "bg-blue-500", verified: true },
  { id: 3, name: "Rachel K.", age: 52, category: "womens-health", product: "Menopause HRT", rating: 5, quote: "The hot flashes were unbearable. Within 3 weeks of starting HRT, they were almost gone. I wish I had done this sooner.", result: "Hot flashes reduced 80%", avatar: "RK", avatarColor: "bg-rose-500", verified: true },
  { id: 4, name: "David L.", age: 34, category: "mens-health", product: "Finasteride", rating: 4, quote: "I started noticing thinning hair at 30. After 8 months on finasteride, my hairline has visibly improved and the shedding completely stopped.", result: "Stopped hair loss · Regrowth visible", avatar: "DL", avatarColor: "bg-indigo-500", verified: true },
  { id: 5, name: "Priya N.", age: 29, category: "skincare", product: "Tretinoin", rating: 5, quote: "My skin has never looked better. The tretinoin cleared my acne and my hyperpigmentation has faded so much.", result: "Clear skin in 10 weeks", avatar: "PN", avatarColor: "bg-amber-500", verified: true },
  { id: 6, name: "Mark B.", age: 41, category: "mental-health", product: "Anxiety SSRI", rating: 5, quote: "Getting a prescription for sertraline online was seamless. The clinician was thorough and the follow-ups have been great. My anxiety is so much more manageable.", result: "Significant anxiety reduction", avatar: "MB", avatarColor: "bg-purple-500", verified: true },
];

const siteConfigData = {
  key: "main",
  steps: [
    { step: 1, title: "Complete Online Evaluation", description: "Answer questions about your health history, symptoms, and goals. Takes about 5 minutes.", icon: "📋" },
    { step: 2, title: "Physician Review", description: "A licensed U.S. physician reviews your information and creates a personalized treatment plan.", icon: "👨‍⚕️" },
    { step: 3, title: "Prescription & Delivery", description: "Your prescription is sent to a licensed pharmacy and delivered to your door — fast and discreet.", icon: "📦" },
    { step: 4, title: "Ongoing Support", description: "Ongoing care, follow-ups, and adjustments as needed — all from the comfort of home.", icon: "💬" },
  ],
  stats: [
    { value: "500K+", label: "Patients served" },
    { value: "4.8/5", label: "Average rating" },
    { value: "48 States", label: "Licensed in" },
    { value: "24hr", label: "Avg physician response" },
  ],
  trustBadges: [
    { title: "Licensed Physicians", description: "All prescriptions written by U.S.-licensed doctors" },
    { title: "FDA-Approved Treatments", description: "Only evidence-based, approved medications" },
    { title: "HIPAA Compliant", description: "Your health data is always private and secure" },
    { title: "Free Shipping", description: "Discreet delivery to your door, always free" },
  ],
  navigation: {
    categories: [
      { name: "Weight Loss", slug: "weight-loss" },
      { name: "Men's Health", slug: "mens-health" },
      { name: "Women's Health", slug: "womens-health" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Skincare", slug: "skincare" },
      { name: "Sleep", slug: "sleep" },
    ],
  },
};

// ─── Schemas (inline for the script) ─────────────────────────────────────────

const CategorySchema = new mongoose.Schema({ id: String, name: String, slug: String, description: String, icon: String, color: String, bgColor: String, textColor: String, image: String, productCount: Number, featured: Boolean }, { timestamps: true });
const ProductSchema = new mongoose.Schema({ id: String, name: String, slug: String, category: String, tagline: String, description: String, shortDescription: String, price: Number, priceUnit: String, originalPrice: Number, image: String, images: [String], badge: String, badgeColor: String, rating: Number, reviewCount: Number, featured: Boolean, inStock: Boolean, prescriptionRequired: Boolean, howItWorks: [String], benefits: [String], ingredients: [String], sideEffects: [String], faqs: [{ question: String, answer: String, _id: false }] }, { timestamps: true });
const TestimonialSchema = new mongoose.Schema({ id: Number, name: String, age: Number, category: String, product: String, rating: Number, quote: String, result: String, avatar: String, avatarColor: String, verified: Boolean }, { timestamps: true });
const SiteConfigSchema = new mongoose.Schema({ key: { type: String, unique: true }, steps: Array, stats: Array, trustBadges: Array, navigation: Object }, { timestamps: true });

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🔌  Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI!);
  console.log("✅  Connected.");

  const CategoryModel = mongoose.models.Category ?? mongoose.model("Category", CategorySchema);
  const ProductModel = mongoose.models.Product ?? mongoose.model("Product", ProductSchema);
  const TestimonialModel = mongoose.models.Testimonial ?? mongoose.model("Testimonial", TestimonialSchema);
  const SiteConfigModel = mongoose.models.SiteConfig ?? mongoose.model("SiteConfig", SiteConfigSchema);

  // Clear existing data
  await Promise.all([
    CategoryModel.deleteMany({}),
    ProductModel.deleteMany({}),
    TestimonialModel.deleteMany({}),
    SiteConfigModel.deleteMany({}),
  ]);
  console.log("🗑️   Cleared existing collections.");

  // Insert fresh data
  await CategoryModel.insertMany(categoriesData);
  console.log(`✅  Inserted ${categoriesData.length} categories.`);

  await ProductModel.insertMany(productsData);
  console.log(`✅  Inserted ${productsData.length} products.`);

  await TestimonialModel.insertMany(testimonialsData);
  console.log(`✅  Inserted ${testimonialsData.length} testimonials.`);

  await SiteConfigModel.create(siteConfigData);
  console.log("✅  Inserted site config.");

  await mongoose.disconnect();
  console.log("🎉  Seeding complete!");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
