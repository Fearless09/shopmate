"use client";

import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { DropdownItem } from "../ui/Dropdown";
import { getCategoryCount, scrollToById } from "@/lib/product-page";

type SideBarProps = {
  localSearch: string;
  changeLocalSearch: (str: string) => void;
  updateQuery: (updates: Record<string, string | null>) => void;
};

export default function Sidebar({
  changeLocalSearch,
  localSearch,
  updateQuery,
}: SideBarProps) {
  const { categories, products } = useShop();

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  return (
    <aside className="sticky top-24 hidden space-y-8 self-start lg:block">
      {/* Search Input */}
      <main className="space-y-3">
        <h3 className="text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
          Search
        </h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateQuery({ search: localSearch, page: "1" });
          }}
          className="relative"
        >
          <input
            type="search"
            value={localSearch}
            onChange={(e) => changeLocalSearch(e.target.value)}
            placeholder="Type to search..."
            className="w-full rounded-xl border border-neutral-200 bg-white p-3 pr-10 text-sm text-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-1 h-full -translate-y-1/2 cursor-pointer pr-2 text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Search className="size-4" />
          </button>
        </form>
      </main>

      {/* Categories Menu */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
          Categories
        </h3>

        <main className="flex max-h-100 scrollbar-thin scrollbar-thumb-neutral-200 flex-col gap-1.5 overflow-y-auto pr-2 dark:scrollbar-thumb-neutral-800">
          {/* Categories Map */}
          {categories.map((cat) => {
            const isActive = category.toLowerCase() === cat.slug.toLowerCase();
            return (
              <DropdownItem
                key={cat.slug}
                onClick={() => {
                  updateQuery({ category: cat.slug, page: "1" });
                  scrollToById("products-grid-section");
                }}
                className={cn("rounded-xl px-4 py-2.5 font-medium capitalize", {
                  "bg-indigo-50/80 text-indigo-600 shadow-sm dark:bg-indigo-950/40 dark:text-indigo-400":
                    isActive,
                })}
              >
                <span>
                  {cat.name.toLowerCase() == "all"
                    ? "All Categories"
                    : cat.name}
                </span>
                <span
                  className={cn(
                    "rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
                    {
                      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300":
                        isActive,
                    },
                  )}
                >
                  {getCategoryCount(cat.slug, products)}
                </span>
              </DropdownItem>
            );
          })}
        </main>
      </section>
    </aside>
  );
}
