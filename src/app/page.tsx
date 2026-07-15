import HeroCarousel from "@/components/shared/HeroCarousel";
import Stats from "@/components/shared/Stats";
import ProductSection from "@/components/shared/ProductSection";
import Features from "@/components/shared/Features";
import Newsletter from "@/components/shared/Newsletter";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Stats />
      <ProductSection />
      <Features />
      <Newsletter />
    </>
  );
}
