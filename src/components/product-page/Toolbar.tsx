"use client";

import { sortingOptions } from "@/data/sorting";
import { useUpdateUrlQuery } from "@/hooks/useUpdateUrlQuery";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

type ToolbarProps = {
  totalItems: number;
  startIndex: number;
  endIndex: number;
  clearLocalsearch: () => void;
  openMobileFilters: () => void;
};

export default function Toolbar({
  clearLocalsearch,
  endIndex,
  openMobileFilters,
  startIndex,
  totalItems,
}: ToolbarProps) {
  const { updateUrlQuery } = useUpdateUrlQuery();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "default";

  const activeSort = sortingOptions.find((o) => o.id === sortBy)?.name || "";

  return (
    <section className="flex flex-col gap-4 border-b border-neutral-200/60 pb-5 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800/60">
      <main className="space-y-1">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {totalItems > 0 ? (
            <>
              Showing{" "}
              <span className="font-semibold text-neutral-800 dark:text-white">
                {startIndex + 1}
              </span>
              -
              <span className="font-semibold text-neutral-800 dark:text-white">
                {endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-800 dark:text-white">
                {totalItems}
              </span>{" "}
              products
            </>
          ) : (
            "No products found"
          )}
        </p>

        {/* Filter tags panel */}
        {(search || category !== "all" || sortBy !== "default") && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill
              closeFn={() => {
                clearLocalsearch();
                updateUrlQuery({ search: "" });
              }}
              title="Search"
              value={search}
            />
            <Pill
              closeFn={() => updateUrlQuery({ category: "all" })}
              title="Category"
              value={category === "all" ? "" : category.replace("-", " ")}
              colored
            />
            <Pill
              closeFn={() => updateUrlQuery({ sort: "default" })}
              title="Sort"
              value={activeSort === "Default Sorting" ? "" : activeSort}
            />
          </div>
        )}
      </main>

      {/* Sort Selection & Responsive Filters Button */}
      <main className="flex items-center gap-3 self-end sm:self-auto">
        <div className="relative flex items-center rounded-xl border border-neutral-200 bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
          <span className="pr-1 pl-3 text-neutral-400">
            <ArrowUpDown className="size-4" />
          </span>

          <select
            value={sortBy}
            onChange={(e) =>
              updateUrlQuery({ sort: e.target.value, page: "1" })
            }
            className="cursor-pointer appearance-none bg-transparent py-2.5 pr-8.5 pl-1.5 text-sm font-semibold text-neutral-600 focus:outline-none dark:text-neutral-400"
            style={{ backgroundImage: "none" }}
          >
            {sortingOptions.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 size-4 text-neutral-400" />
        </div>

        <button
          onClick={() => openMobileFilters()}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 lg:hidden dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400"
        >
          <SlidersHorizontal className="size-4" />
          <span>Filters</span>
        </button>
      </main>
    </section>
  );
}

type PillProps = {
  title: string;
  value: string;
  closeFn: () => void;
  colored?: boolean;
};
const Pill = ({ closeFn, title, value, colored = false }: PillProps) => {
  if (!value.trim()) return;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
        {
          "bg-indigo-50 text-indigo-700 capitalize dark:bg-indigo-950/40 dark:text-indigo-300":
            colored,
        },
      )}
    >
      {title}: {value}
      <button
        onClick={closeFn}
        className="ml-0.5 cursor-pointer hover:text-red-500"
      >
        <X className="size-3.5" />
      </button>
    </span>
  );
};
