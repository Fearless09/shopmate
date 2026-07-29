"use client";

import { useShop } from "@/context/ShopContext";
import { useClose } from "@/hooks/useClose";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { ChevronDown, Frown, Heart, Search, ShoppingBag } from "lucide-react";
import { CartDropdownItem, DropdownItem, DropdownWrapper } from "./Dropdown";
import Link from "next/link";
import { EmptyState } from "./EmptyState";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CartItemSkeleton } from "./Skeleton";
import { toCartProduct } from "@/lib/product";

export const CategoryAction = () => {
  const { categories } = useShop();
  const [isOpen, toggleIsOpen] = useToggle(false);
  const ref = useClose(() => toggleIsOpen(false));

  if (categories.length === 0) return;

  return (
    <main ref={ref} className="relative">
      <button
        className="transition-300 flex cursor-pointer items-center gap-0.75 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        aria-label="Categories"
        onClick={() => toggleIsOpen()}
      >
        Categories
        <ChevronDown
          className={cn("transition-300 size-4", { "rotate-180": isOpen })}
        />
      </button>

      <DropdownWrapper
        isOpen={isOpen}
        xPosition="left"
        className="max-h-60 w-55"
      >
        {categories.map(({ name, slug }) => (
          <Link
            key={slug}
            className="block"
            href={`/products?category=${slug}`}
            onClick={() => toggleIsOpen(false)}
          >
            <DropdownItem>{name}</DropdownItem>
          </Link>
        ))}
      </DropdownWrapper>
    </main>
  );
};

export const CartAction = () => {
  const { cart } = useShop();

  return (
    <Link
      href={"/checkout"}
      className="transition-300 relative flex size-9 cursor-pointer items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
      aria-label="Cart"
    >
      <ShoppingBag className="size-5" />
      {cart && cart.totalProducts > 0 && (
        <span className="absolute -top-1 -right-1 flex size-4.25 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-neutral-950">
          {cart.totalProducts}
        </span>
      )}
    </Link>
  );
};

export const WishlishAction = () => {
  const router = useRouter();

  const { wishList, loading } = useShop();
  const [isOpen, toggleIsOpen] = useToggle(false);
  const ref = useClose(() => toggleIsOpen(false));

  return (
    <main ref={ref} className="relative">
      <button
        className="transition-300 relative flex size-9 cursor-pointer items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
        aria-label="Wishlist"
        onClick={() => toggleIsOpen()}
      >
        <Heart className="size-5" />
        {wishList.length > 0 && (
          <span className="absolute -top-1 -right-1 flex size-4.25 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-neutral-950">
            {wishList.length}
          </span>
        )}
      </button>

      <DropdownWrapper isOpen={isOpen} className="w-85">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CartItemSkeleton key={idx} compType="wishlist" />
          ))
        ) : wishList.length > 0 ? (
          wishList.map((item) => (
            <CartDropdownItem
              key={item.id}
              {...item}
              compType="wishlist"
              onclick={() => toggleIsOpen(false)}
            />
          ))
        ) : (
          <EmptyState
            actionText="Browse products"
            description="Your favorites items will show up here. Start browsing to find something you'll love."
            icon={Heart}
            onAction={() => {
              router.push("/products");
              toggleIsOpen(false);
            }}
            title="Your wishlist is empty"
            classNmae="mt-0 border-0 py-7"
          />
        )}
      </DropdownWrapper>
    </main>
  );
};

export const SearchAction = () => {
  const router = useRouter();

  const { products, loading } = useShop();
  const [isOpen, toggleIsOpen] = useToggle(false);
  const [value, setValue] = useState<string>("");
  const ref = useClose(() => {
    toggleIsOpen(false);
    setValue("");
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const searchProducts = useMemo(() => {
    if (!value) return [];

    const val = value.trim().toLowerCase();
    const findProduct = products.filter(
      (p) =>
        p.title.toLowerCase().includes(val) ||
        p.description.toLowerCase().includes(val) ||
        p.category.toLowerCase().includes(val),
    );

    const transfromProduct: CartProduct[] = findProduct.map((p) =>
      toCartProduct(p, 1),
    );

    return transfromProduct;
  }, [products, value]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [inputRef.current, isOpen]);

  return (
    <main ref={ref} className="relative">
      <form
        className={cn(
          "transition-300 flex overflow-hidden rounded-lg border border-transparent text-neutral-600 dark:text-neutral-400",
          {
            "border-neutral-200 bg-neutral-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900":
              isOpen,
          },
        )}
        onSubmit={(e) => {
          e.preventDefault();
          const val = value.trim();

          if (val) {
            router.push(`/products?search=${val}`);
            setValue("");
            toggleIsOpen(false);
          } else {
            toggleIsOpen();
          }
        }}
      >
        {isOpen && (
          <input
            ref={inputRef}
            id="nav-search"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-9 w-full max-w-80 grow px-3 outline-0"
          />
        )}
        <button
          type="submit"
          className="transition-300 flex size-9 cursor-pointer items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
          aria-label="Search"
        >
          <Search className="size-5" />
        </button>
      </form>

      <DropdownWrapper isOpen={isOpen} className="w-85">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CartItemSkeleton key={idx} compType="search" />
          ))
        ) : searchProducts.length > 0 ? (
          searchProducts.map((item) => (
            <CartDropdownItem
              key={item.id}
              {...item}
              compType="search"
              onclick={() => toggleIsOpen(false)}
            />
          ))
        ) : (
          <EmptyState
            actionText="Browser Products"
            description="We couldn't find anything matching your filters or search query. Try modifying your keywords."
            icon={Frown}
            onAction={() => {
              router.push("/products");
              toggleIsOpen(false);
            }}
            title="No Products Found"
            classNmae="mt-0 border-0 py-7"
          />
        )}
      </DropdownWrapper>
    </main>
  );
};
