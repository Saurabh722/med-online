export const dynamic = 'force-dynamic';

import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
    </>
  );
}
