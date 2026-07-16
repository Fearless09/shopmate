"use client";

import { useState, useMemo, useRef } from "react";
import { Search, ArrowUpDown, Frown, ChevronDown } from "lucide-react";
import { ProductCard, ProductCardWrapper } from "./ProductCard";
import { EmptyState } from "../ui/EmptyState";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
import { filterProduct } from "@/lib/product";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ProductCardSkeleton } from "../ui/Skeleton";
import { sortingOptions } from "@/data/sorting";

export default function ProductSection() {
  const { products, categories, loading } = useShop();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter and Sort products
  const filteredProducts = useMemo(
    () => filterProduct({ products, search, category, sort: sortBy }),
    [search, category, sortBy, products],
  );

  // Categories
  const productCategories = ["all", ...products.map((p) => p.category)];
  const currentCategory = categories.filter((cat) =>
    productCategories.includes(cat.slug),
  );

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.95, opacity: 0.25 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power4",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { dependencies: [category, sortBy], scope: containerRef },
  );

  return (
    <section className="w-full bg-white py-20 dark:bg-neutral-950">
      <section className="wrapper">
        {/* Section Header */}
        <header className="mx-auto mb-12 max-w-2xl space-y-2.5 text-center">
          <span className="block text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            Curated Catalog
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-4xl dark:text-white">
            Explore Our Products
          </h2>
          <p className="mx-auto max-w-lg text-sm text-pretty text-neutral-600 dark:text-neutral-400">
            Discover premium quality and handcrafted details across electronics,
            jewelry, clothing, and everyday items.
          </p>
        </header>

        {/* Toolbar: Search & Filters */}
        <main className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-5 dark:border-neutral-900">
          {/* Search bar */}
          <div className="relative max-w-md grow">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              <Search className="size-4.5" />
            </span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, descriptions..."
              className={cn(
                "block w-full rounded-xl border border-neutral-200 bg-white p-2.5 pl-10 text-sm text-neutral-900 shadow-sm",
                "dark:border-neutral-800 dark:bg-neutral-950 dark:text-white",
                "focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:focus:border-indigo-500",
              )}
            />
          </div>

          {/* Filtering & Sorting Controls */}
          {/* Sorting */}
          <div className="relative flex w-max items-center gap-2 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
            <ArrowUpDown className="pointer-events-none absolute left-2 size-4 shrink-0 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none bg-transparent py-2 pr-8.5 pl-7.5 text-sm font-medium text-neutral-600 focus:outline-none dark:text-neutral-400"
              style={{ backgroundImage: "none" }}
            >
              {sortingOptions.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {/* Custom arrow decoration */}
            <ChevronDown className="pointer-events-none absolute right-2 size-4 shrink-0 text-neutral-400" />
          </div>
        </main>

        {/* Categories Bar */}
        <main
          className={cn(
            "flex scrollbar-none gap-2 overflow-x-auto px-3 pb-5",
            "mask-[linear-gradient(to_right,transparent,black_30px,black_calc(100%-30px),transparent)]",
          )}
        >
          {currentCategory.map(({ name, slug }) => (
            <button
              key={slug}
              onClick={() => setCategory(slug)}
              className={cn(
                `transition-300 cursor-pointer rounded-full bg-neutral-50 px-5 py-2 text-xs font-semibold tracking-wide whitespace-nowrap text-neutral-600 capitalize hover:scale-102 dark:bg-neutral-900/60 dark:text-neutral-400`,
                {
                  "bg-neutral-900 text-white shadow-md dark:bg-white dark:text-neutral-900":
                    slug === category,
                  "border border-neutral-200/50 hover:bg-neutral-100 dark:border-neutral-800/40 dark:hover:bg-neutral-800":
                    slug !== category,
                },
              )}
            >
              {name}
            </button>
          ))}
        </main>

        <section ref={containerRef}>
          {/* Products Grid */}
          {loading ? (
            <ProductCardWrapper>
              {Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </ProductCardWrapper>
          ) : filteredProducts.length > 0 ? (
            <ProductCardWrapper>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductCardWrapper>
          ) : (
            <EmptyState
              actionText="Reset Filter"
              description="We couldn't find anything matching your filters or search query. Try modifying your keywords."
              icon={Frown}
              onAction={() => {
                setSearch("");
                setCategory("All");
                setSortBy("default");
              }}
              title="No Products Found"
            />
          )}
        </section>
      </section>
    </section>
  );
}
