import { calcTotal } from "./utils";

export const scrollToById = (id: string) => {
  setTimeout(() => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 50);
};

export const getCategoryCount = (catSlug: string, products: Product[]) => {
  if (catSlug === "all") return products.length;

  return products.filter(
    (p) => p.category.toLowerCase() === catSlug.toLowerCase(),
  ).length;
};

// Generate pagination buttons sequence (supports ellipses if total pages > 7)
export const getPageNumbers = (current: number, total: number) => {
  const pages: number[] = [];
  if (total <= 7) {
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
