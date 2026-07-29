"use client";

import { useShop } from "@/context/ShopContext";
import { getCategoryCount } from "@/lib/product";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { DropdownItem } from "../ui/Dropdown";
import { useUpdateUrlQuery } from "@/hooks/useUpdateUrlQuery";
import { useEffect } from "react";

type MobileDrawerProp = {
  mobileFiltersOpen: boolean;
  closeMobileFilters: () => void;
  localSearch: string;
  changeLocalSearch: (str: string) => void;
};

export default function MobileDrawer({
  closeMobileFilters,
  mobileFiltersOpen,
  changeLocalSearch,
  localSearch,
}: MobileDrawerProp) {
  const { categories, products } = useShop();
  const { updateUrlQuery } = useUpdateUrlQuery();

  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  useEffect(() => {
    const body = document.querySelector("body");
    if (mobileFiltersOpen) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }
  }, [mobileFiltersOpen]);

  return (
    <section
      className={cn(
        "transition-300 pointer-events-none fixed inset-0 z-50 flex justify-end opacity-0 duration-300",
        { "pointer-events-auto opacity-100": mobileFiltersOpen },
      )}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay */}
      <div
        className="transition-300 absolute inset-0 bg-neutral-950/60 backdrop-blur-xs"
        onClick={() => closeMobileFilters()}
        aria-label="mobile-filters-backdrop"
      />

      {/* Panel body */}
      <section
        className={cn(
          "transition-300 relative flex size-full max-w-xs translate-x-full flex-col bg-white p-5 shadow-xl dark:bg-neutral-950",
          { "translate-x-0": mobileFiltersOpen },
        )}
        aria-label="mobile-filters-panel"
      >
        <header className="flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-neutral-900">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            Filters
          </h2>
          <button
            type="button"
            onClick={() => closeMobileFilters()}
            className="transition-300 cursor-pointer rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Close mobile filters"
          >
            <X className="size-5" />
          </button>
        </header>

        <section className="flex-1 scrollbar-none space-y-6 overflow-y-auto py-6">
          {/* Search Input */}
          <main className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Search
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateUrlQuery({ search: localSearch, page: "1" });
                closeMobileFilters();
              }}
              className="relative"
            >
              <input
                type="search"
                value={localSearch}
                onChange={(e) => changeLocalSearch(e.target.value)}
                placeholder="Type to search..."
                className="w-full rounded-xl border border-neutral-200 bg-white p-3 pr-10 text-sm text-neutral-900 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
              />
              <button
                type="submit"
                className="absolute top-1/2 right-1 h-full -translate-y-1/2 cursor-pointer pr-2 text-neutral-400 hover:text-indigo-500"
              >
                <Search className="size-4" />
              </button>
            </form>
          </main>

          {/* Categories */}
          <main className="space-y-2">
            <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
              Categories
            </h3>

            <div className="flex flex-col gap-0.5">
              {categories.map((cat) => {
                const isActive =
                  category.toLowerCase() === cat.slug.toLowerCase();
                return (
                  <DropdownItem
                    key={cat.slug}
                    onClick={() => {
                      updateUrlQuery({ category: cat.slug, page: "1" });
                      closeMobileFilters();
                    }}
                    className={cn(
                      "rounded-lg px-4 py-2.5 font-medium capitalize",
                      {
                        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400":
                          isActive,
                      },
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold dark:bg-neutral-800">
                      {getCategoryCount(cat.slug, products)}
                    </span>
                  </DropdownItem>
                );
              })}
            </div>
          </main>
        </section>
      </section>
    </section>
  );
}
