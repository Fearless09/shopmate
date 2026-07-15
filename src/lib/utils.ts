import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatNumber(amount: number) {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

const RESULT_LIMIT = 8;
export function filterProduct({
  category,
  products,
  search,
  sort,
  limit,
}: {
  products: Product[];
  search: string;
  category: string;
  sort: string;
  limit?: number | null;
}): Product[] {
  let result = [...products];

  const term = search.trim().toLowerCase();
  if (term) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    );
  }

  if (category && category.toLowerCase() !== "all") {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
  }

  if (limit === null) {
    return result;
  }
  return result.slice(0, limit ?? RESULT_LIMIT);
}

export function calcTotal({
  discountPercentage,
  price,
  quantity,
}: {
  quantity: number;
  price: number;
  discountPercentage: number;
}) {
  const total = price * quantity;
  const discountedPrice = (discountPercentage / 100) * total;
  const discountedTotal = total - discountedPrice;

  return {
    discountedPrice,
    discountedTotal,
    total,
  };
}
