"use client";

import { useShop } from "@/context/ShopContext";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { ProductCard, ProductCardWrapper } from "../shared/ProductCard";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { EmptyState } from "../ui/EmptyState";
import { Frown } from "lucide-react";

type ProductionSectionProps = {
  currentPage: number;
  paginatedProducts: Product[];
  emptyStateAction: () => void;
};

export default function ProductionSection({
  currentPage,
  emptyStateAction,
  paginatedProducts,
}: ProductionSectionProps) {
  const { loading } = useShop();
  const gridRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "default";

  useGSAP(
    () => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".product-card-anim");
        if (cards.length === 0) return;

        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 26, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "all",
          },
        );
      }
    },
    {
      dependencies: [currentPage, search, category, sortBy, loading],
      scope: gridRef,
    },
  );

  return (
    <section ref={gridRef}>
      {loading ? (
        <ProductCardWrapper className="mt-0 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </ProductCardWrapper>
      ) : paginatedProducts.length > 0 ? (
        <ProductCardWrapper className="mt-0 lg:grid-cols-3">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="product-card-anim">
              <ProductCard product={product} />
            </div>
          ))}
        </ProductCardWrapper>
      ) : (
        <EmptyState
          actionText="Reset All Filters"
          description="We couldn't find any products matching your current search query or active category filters."
          icon={Frown}
          onAction={() => emptyStateAction()}
          title="No Products Found"
        />
      )}
    </section>
  );
}
