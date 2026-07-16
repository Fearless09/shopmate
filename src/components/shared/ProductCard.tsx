"use client";

import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useShop } from "@/context/ShopContext";
import { ComponentProps, useMemo } from "react";
import Link from "next/link";
import { renderProductStars } from "@/lib/product";
import { toCartProduct } from "@/lib/product-page";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { shopDispatcher, wishList, cart } = useShop();

  const isWishlisted = wishList.some((p) => p.id === product.id);
  const isCarted = cart ? cart.product.some((p) => p.id === product.id) : false;

  const cartProduct: CartProduct = useMemo(
    () => toCartProduct(product, 1),
    [product],
  );

  return (
    <main className="transition-300 relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-700">
      {/* Wishlist Button (Floating) */}
      <button
        onClick={() => {
          if (isWishlisted) {
            shopDispatcher({ type: "delete-wishlist", payload: product.id });
          } else {
            shopDispatcher({ type: "add-wishlist", payload: cartProduct });
          }
        }}
        className="transition-300 absolute top-3.5 right-3.5 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/95 text-neutral-600 shadow-sm hover:scale-105 active:scale-95 dark:bg-neutral-900/95 dark:text-neutral-400"
        aria-label="Toggle Wishlist"
      >
        <Heart
          className={cn(
            `transition-300 size-4.5 text-neutral-500 hover:text-rose-500`,
            { "fill-rose-500 text-rose-500": isWishlisted },
          )}
        />
      </button>

      {/* Product Image Area */}
      <Link
        href={`/products/${product.id}`}
        className="group relative block aspect-square w-full cursor-pointer overflow-hidden bg-neutral-100 dark:bg-neutral-900"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className="transition-300 object-cover object-center group-hover:scale-105"
          loading="eager"
        />

        {/* Hover overlay icons */}
        <span className="transition-300 absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 dark:bg-black/30">
          <span
            className="transition-300 flex size-11 scale-90 items-center justify-center rounded-full bg-white text-neutral-900 shadow-md group-hover:scale-100 hover:bg-neutral-50 active:scale-95"
            title="Quick View"
          >
            <Eye className="size-5" />
          </span>
        </span>
      </Link>

      {/* Product Info Block */}
      <div className="flex grow flex-col p-4 text-left">
        {/* Category */}
        <span className="block text-[10px] font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="transition-300 mt-1 line-clamp-1 cursor-pointer text-sm font-bold text-neutral-800 hover:text-indigo-600 dark:text-neutral-200 dark:hover:text-indigo-400">
            {product.title}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="flex items-center">
            {renderProductStars(product.rating)}
          </span>
          <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
            ({product.reviews.length})
          </span>
        </div>

        {/* Price & Cart CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-200/60 pt-2 dark:border-neutral-900">
          <span className="text-base font-extrabold text-neutral-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>

          <button
            onClick={() => {
              if (isCarted && cart) {
                shopDispatcher({
                  type: "delete-cart",
                  payload: product.id,
                });
              } else {
                shopDispatcher({ type: "add-cart", payload: cartProduct });
              }
            }}
            className={cn(
              "transition-300 flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm",
              {
                "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100":
                  !isCarted,
                "border border-neutral-200 text-neutral-700 hover:text-neutral-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100":
                  isCarted,
              },
            )}
          >
            <ShoppingCart className="size-3.5" />
            {isCarted ? "Remove" : "Add"}
          </button>
        </div>
      </div>
    </main>
  );
}

type ProductCardWrapper = ComponentProps<"main">;
export function ProductCardWrapper({
  className,
  ...props
}: ProductCardWrapper) {
  return (
    <main
      className={cn(
        "mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}
