export function ProductCardSkeleton() {
  return (
    <main className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      {/* Wishlist Button (Floating) */}
      <div className="absolute top-3.5 right-3.5 z-10 size-8 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />

      {/* Product Image Area */}
      <div className="relative aspect-square w-full animate-pulse bg-neutral-200 dark:bg-neutral-800" />

      {/* Product Info Block */}
      <div className="flex grow flex-col p-4 text-left">
        {/* Category */}
        <div className="h-2.5 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Title */}
        <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />

        {/* Ratings */}
        <div className="mt-3 flex items-center gap-1.5">
          <div className="h-3 w-20 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-2.5 w-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Price & Cart CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-200/60 pt-3 dark:border-neutral-900">
          <div className="h-4 w-14 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-7 w-16 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </main>
  );
}

interface CartItemSkeletonProps {
  compType?: "cart" | "search"| "wishlist" ;
}
export function CartItemSkeleton({ compType = "cart" }: CartItemSkeletonProps) {
  return (
    <div className="flex w-full items-center gap-2 px-3 py-2">
      {/* Thumbnail */}
      <div className="relative size-16 shrink-0 animate-pulse overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900" />

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-1.5">
          <div className="h-3.5 w-32 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          {compType !== "search" && (
            <div className="size-4 shrink-0 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          )}
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="h-3.5 w-12 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-10 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-900" />
        </div>

        {/* Quantity Stepper */}
        {compType === "cart" && (
          <div className="mt-2 flex items-center justify-between">
            <div className="h-7 w-[76px] animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-900" />
            <div className="h-3.5 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-neutral-50 pb-20 dark:bg-neutral-950">
      {/* Header Banner Skeleton */}
      <div className="relative overflow-hidden bg-neutral-950 py-16 text-white">
        <div className="wrapper relative z-10 space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
          <div className="h-10 w-64 animate-pulse rounded bg-neutral-800" />
          <div className="h-6 w-96 animate-pulse rounded bg-neutral-800" />
        </div>
      </div>

      <div className="wrapper mt-10 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Skeleton */}
        <div className="hidden animate-pulse space-y-6 lg:block">
          <div className="h-6 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-full rounded-xl bg-neutral-200 dark:bg-neutral-800"
              />
            ))}
          </div>
        </div>

        {/* Catalog Skeleton */}
        <div className="space-y-6 lg:col-span-3">
          <div className="h-12 w-full animate-pulse rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-96 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}