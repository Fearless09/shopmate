import { calcTotal } from "./utils";

export const getCategoryCount = (catSlug: string, products: Product[]) => {
  if (catSlug === "all") return products.length;

  return products.filter(
    (p) => p.category.toLowerCase() === catSlug.toLowerCase(),
  ).length;
};

// Generate pagination buttons sequence (supports ellipses if total pages > 5)
export const getPageNumbers = (current: number, total: number) => {
  const pages: number[] = [];
  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) {
      pages.push(-1); // -1 triggers ellipsis rendering
    }
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (current < total - 2) {
      pages.push(-1);
    }
    pages.push(total);
  }
  return pages;
};

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

export const toCartProduct = (
  product: Product,
  quantity: number,
): CartProduct => {
  const { total, discountedTotal } = calcTotal({
    discountPercentage: product.discountPercentage,
    price: product.price,
    quantity,
  });

  return {
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    discountPercentage: product.discountPercentage,
    quantity,
    total,
    discountedTotal,
  };
};
