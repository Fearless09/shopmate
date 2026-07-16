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

export const scrollToById = (id: string) => {
  setTimeout(() => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 50);
};

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

  return { discountedPrice, discountedTotal, total };
}

export function cartTotal(cartProducts: CartProduct[]) {
  const totalProducts = cartProducts.length;
  const totals = cartProducts.reduce(
    (acc, item) => {
      const totalQuantity = acc.totalQuantity + item.quantity;
      const total = acc.total + item.total;
      const discountedTotal = acc.discountedTotal + item.discountedTotal;

      return { total, discountedTotal, totalQuantity };
    },
    { total: 0, discountedTotal: 0, totalQuantity: 0 },
  );

  return { ...totals, totalProducts };
}
