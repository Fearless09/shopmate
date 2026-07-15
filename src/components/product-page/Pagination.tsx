"use client";

import { getPageNumbers } from "@/lib/product-page";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  handlePageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages < 2) return null;

  return (
    <section className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200/60 pt-8 sm:flex-row dark:border-neutral-800/60">
      <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
        Page{" "}
        <span className="text-neutral-800 dark:text-white">{currentPage}</span>{" "}
        of{" "}
        <span className="text-neutral-800 dark:text-white">{totalPages}</span>
      </p>

      <nav className="flex items-center gap-1.5">
        {/* Prev Button */}
        <Button
          onClick={() => {
            handlePageChange(Math.max(currentPage - 1, 1));
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>

        {/* Page Numbers */}
        {getPageNumbers(currentPage, totalPages).map((p, idx) => {
          if (p === -1) {
            return (
              <span
                key={`ellipse-${idx}`}
                className="px-2 font-semibold text-neutral-400 select-none"
              >
                ...
              </span>
            );
          }
          return (
            <Button
              key={`page-${p}`}
              onClick={() => handlePageChange(p)}
              active={currentPage === p}
            >
              {p}
            </Button>
          );
        })}

        {/* Next Button */}
        <Button
          onClick={() => {
            handlePageChange(Math.min(currentPage + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="size-5" />
        </Button>
      </nav>
    </section>
  );
}

type ButtonProps = ComponentProps<"button"> & { active?: boolean };
const Button = ({ className, active, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "transition-300 flex size-10 cursor-pointer items-center justify-center rounded-xl bg-white text-sm font-bold text-neutral-600 disabled:pointer-events-none disabled:opacity-40",
        "[&>svg]:size-5",
        {
          "bg-indigo-600 text-white shadow-md shadow-indigo-600/20": active,
          "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900":
            !active,
        },
        className,
      )}
      {...props}
    />
  );
};
