"use client";

import { useState, useMemo, useRef } from "react";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
import { ProductDetailSkeleton } from "../ui/Skeleton";
import BreadCrumbs from "./BreadCrumbs";
import GalleryCard from "./GalleryCard";
import Details from "./Details";
import Description from "./Description";
import Reviews from "./Reviews";
import SimilarProduct from "../shared/SimilarProduct";

interface ProductDetailClientProps {
  productId: number;
}
type TabId = "description" | "dimensions" | "reviews";

export default function ProductDetailClient({
  productId,
}: ProductDetailClientProps) {
  const { products, loading } = useShop();

  const reviewsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const product = useMemo(() => {
    return products.find((p) => p.id === productId);
  }, [products, productId]);

  if (loading) return <ProductDetailSkeleton />;
  if (!product) return;

  return (
    <section className="pb-20 text-neutral-800 dark:text-neutral-200">
      <BreadCrumbs {...product} />

      {/* Main product display columns */}
      <main className="wrapper mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <GalleryCard {...product} />
        <Details
          onReview={() => {
            setActiveTab("reviews");
            setTimeout(() => {
              reviewsRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 50);
          }}
          product={product}
        />
      </main>

      <section ref={reviewsRef} className="wrapper mt-16 scroll-mt-24">
        {/* Tab Headers */}
        <main className="mb-8 flex border-b border-neutral-200 dark:border-neutral-800">
          {tabs(product.reviews.length).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "transition-300 cursor-pointer border-b-2 border-transparent px-6 py-3.5 text-sm font-bold tracking-wide text-neutral-500",
                {
                  "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400":
                    activeTab === tab.id,
                  "hover:text-neutral-900 dark:hover:text-white":
                    activeTab !== tab.id,
                },
              )}
            >
              {tab.name}
            </button>
          ))}
        </main>

        {activeTab === "description" ? (
          <Description product={product} />
        ) : (
          <Reviews product={product} />
        )}
      </section>

      <SimilarProduct product={product} />
    </section>
  );
}

const tabs = (reviewsLength: number): { id: TabId; name: string }[] => {
  return [
    { id: "description", name: "Description & Dimensions" },
    { id: "reviews", name: `Reviews (${reviewsLength})` },
  ];
};
