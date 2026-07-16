"use client";

import { useShop } from "@/context/ShopContext";
import { Sparkles } from "lucide-react";
import { useMemo } from "react";
import { ProductCard, ProductCardWrapper } from "../shared/ProductCard";

type SimilarProductProps = { product?: Product | Product[] };
const SimilarProduct = ({ product }: SimilarProductProps) => {
  const { products } = useShop();

  const similarProducts = useMemo(() => {
    if (!product)
      return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

    if (Array.isArray(product)) {
      const productIds = new Set(product.map((p) => p.id));
      return [...products]
        .filter((p) => !productIds.has(p.id))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    }

    return [...products]
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (similarProducts.length === 0) return;

  return (
    <section className="wrapper mt-16 border-t border-neutral-200/70 pt-16 dark:border-neutral-800/70">
      <header className="mb-8 flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
          <Sparkles className="size-4.5" />
        </span>
        <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
          {product ? "Similar" : "Recommended"} Products You May Like
        </h2>
      </header>

      <ProductCardWrapper className="mt-0">
        {similarProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ProductCardWrapper>
    </section>
  );
};

export default SimilarProduct;
