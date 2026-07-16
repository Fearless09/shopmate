import { useShop } from "@/context/ShopContext";
import { gsap } from "@/lib/gsap";
import { formatCurrency } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type CartItemsProp = { cart: Cart };

const CartItems = ({ cart }: CartItemsProp) => {
  const ref = useRef<HTMLElement>(null);
  const { shopDispatcher } = useShop();

  useGSAP(
    () => {
      if (cart.products.length === 0 || !ref.current) return;
      gsap.fromTo(
        ref.current.childNodes,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [cart.products.length], scope: ref },
  );

  return (
    <section className="space-y-6 lg:col-span-2">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
          Cart: {cart.totalProducts} Product{cart.totalProducts > 1 ? "s" : ""},{" "}
          {cart.totalQuantity} Item{cart.totalQuantity > 1 ? "s" : ""}
        </h2>

        <button
          onClick={() => shopDispatcher({ type: "clear-cart" })}
          className="transition-300 cursor-pointer text-xs font-extrabold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
        >
          Clear Cart
        </button>
      </div>

      <main ref={ref} className="space-y-4">
        {cart.products.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </main>
    </section>
  );
};

export default CartItems;

interface CartItemRowProps {
  item: CartProduct;
}

function CartItemRow({ item }: CartItemRowProps) {
  const { shopDispatcher, products } = useShop();
  const product = products.find((p) => p.id === item.id);
  const maxStock = product?.stock || 15;

  const handleQtyChange = (newQty: number) => {
    const qty = Math.max(1, Math.min(newQty, maxStock));
    shopDispatcher({
      type: "update-cart-quantity",
      payload: { id: item.id, quantity: qty },
    });
  };

  return (
    <main className="transition-300 flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/60 bg-white p-4 shadow-xs hover:border-neutral-200 sm:flex-row sm:items-center dark:border-neutral-800/60 dark:bg-neutral-900/20 dark:hover:border-neutral-700">
      <main className="flex items-center gap-4">
        {/* Thumbnail Image */}
        <Link
          href={`/products/${item.id}`}
          className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900"
        >
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover object-center"
          />
        </Link>

        {/* Details text */}
        <div className="min-w-0">
          <Link
            href={`/products/${item.id}`}
            className="transition-300 line-clamp-1 block text-sm font-bold text-neutral-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
          >
            {item.title}
          </Link>
          <span className="mt-0.5 block text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
            {product ? product.category.replace("-", " ") : "Category"}
          </span>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(item.discountedTotal / item.quantity)}
            </span>
            {item.discountPercentage > 0 && (
              <span className="text-xs text-neutral-400 line-through dark:text-neutral-600">
                {formatCurrency(item.price)}
              </span>
            )}
          </div>
        </div>
      </main>

      <main className="flex items-center justify-between gap-6 border-t border-neutral-100 pt-3 sm:justify-end sm:border-t-0 sm:pt-0">
        {/* Quantity control steppers */}
        <div className="flex items-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
          <button
            type="button"
            onClick={() => handleQtyChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="transition-300 flex size-8 cursor-pointer items-center justify-center rounded-l-lg text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <Minus className="size-3" />
          </button>
          <span className="w-9 text-center text-xs font-bold text-neutral-950 dark:text-white">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQtyChange(item.quantity + 1)}
            disabled={item.quantity >= maxStock}
            className="transition-300 flex size-8 cursor-pointer items-center justify-center rounded-r-lg text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-30 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <Plus className="size-3" />
          </button>
        </div>

        {/* Pricing Subtotals & Removals click-trigger */}
        <div className="flex items-center gap-4">
          <div className="min-w-[70px] text-right">
            <span className="block text-sm font-extrabold text-neutral-900 dark:text-white">
              {formatCurrency(item.discountedTotal)}
            </span>
            {item.discountPercentage > 0 && (
              <span className="block text-[10px] font-semibold text-neutral-400 line-through dark:text-neutral-600">
                {formatCurrency(item.total)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              shopDispatcher({ type: "delete-cart", payload: item.id })
            }
            className="transition-300 flex size-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:border-red-100 hover:bg-red-50/50 hover:text-red-500 dark:border-neutral-800 dark:hover:border-red-950/40 dark:hover:bg-red-950/10 dark:hover:text-red-400"
            aria-label={`Remove ${item.title} from cart`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </main>
    </main>
  );
}
