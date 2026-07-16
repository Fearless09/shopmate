import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BreadCrumbs({ category, title }: Product) {
  return (
    <section className="border-b border-neutral-200/50 bg-white/60 py-4 backdrop-blur-md dark:border-neutral-800/40 dark:bg-neutral-950/60">
      <section className="wrapper flex flex-wrap items-center justify-between gap-4">
        <main className="flex items-center gap-2 text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
          <Link href="/" className="transition-300 hover:text-indigo-600">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="transition-300 hover:text-indigo-600"
          >
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${category}`}
            className="capitalize transition-colors hover:text-indigo-600"
          >
            {category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="line-clamp-1 max-w-[200px] text-neutral-900 capitalize dark:text-white">
            {title}
          </span>
        </main>

        <Link
          href="/products"
          className="transition-300 inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <ArrowLeft className="size-3.5" />
          <span>Return to Catalog</span>
        </Link>
      </section>
    </section>
  );
}
