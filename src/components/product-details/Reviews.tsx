import { renderProductStars, reviewsStat } from "@/lib/product";
import { formatDate } from "@/lib/utils";

type ReviewsProp = { product: Product };
const Reviews = ({ product }: ReviewsProp) => {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Ratings Summary Card */}
      <main className="self-start rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
        <h3 className="text-sm font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
          Reviews Overview
        </h3>

        <div className="mt-4 text-center">
          <h2 className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
            {product.rating.toFixed(1)}
          </h2>
          <div className="mt-2 flex justify-center gap-0.5">
            {renderProductStars(product.rating, "size-4")}
          </div>
          <p className="mt-2 block text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Average of {product.reviews.length} ratings
          </p>
        </div>

        {/* Star distribution bars */}
        <main className="mt-6 space-y-3.5">
          {reviewsStat(product.reviews).map(({ id, per }, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span className="w-8.5 shrink-0 text-right font-bold text-neutral-500">
                {id} Star
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                <span
                  className="block h-full rounded-full bg-amber-400"
                  style={{ width: `${Math.min(per, 100)}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right font-bold text-neutral-400">
                {Math.min(per, 100)}%
              </span>
            </div>
          ))}
        </main>
      </main>

      {/* Reviews Items Grid list */}
      <main className="space-y-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          Customer Feedback
        </h3>

        {product.reviews && product.reviews.length > 0 ? (
          <main className="space-y-4">
            {product.reviews.map((r, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs dark:border-neutral-800 dark:bg-neutral-900/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {r.reviewerName}
                    </h4>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {r.reviewerEmail}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="flex justify-end gap-0.5">
                      {renderProductStars(r.rating)}
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-400">
                      {formatDate(new Date(r.date))}
                    </span>
                  </div>
                </div>

                <p className="mt-3.5 text-sm leading-relaxed text-pretty text-neutral-600 dark:text-neutral-400">
                  "{r.comment}"
                </p>
              </div>
            ))}
          </main>
        ) : (
          <div className="py-8 text-center text-sm text-neutral-500">
            No reviews for this product yet.
          </div>
        )}
      </main>
    </section>
  );
};

export default Reviews;
