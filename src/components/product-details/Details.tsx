import { useShop } from "@/context/ShopContext";
import { gsap } from "@/lib/gsap";
import { renderProductStars } from "@/lib/product";
import { toCartProduct } from "@/lib/product-page";
import { calcTotal, cn, formatCurrency } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { ComponentProps, FC, useCallback, useMemo, useRef } from "react";

type DetailProps = {
  product: Product;
  onReview: () => void;
};

const STOCK_MAX = 20;
const STOCK_WARNING = 5;

const Details = ({ onReview, product }: DetailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cart, wishList, shopDispatcher } = useShop();

  const isWishlisted = useMemo(() => {
    return wishList.some((item) => item.id === product.id);
  }, [wishList, product.id]);

  const existingCartItem = useMemo(() => {
    return cart?.product.find((item) => item.id === product.id);
  }, [cart, product.id]);

  const newCartProduct: CartProduct = useMemo(() => {
    return toCartProduct(product, 1);
  }, [product]);

  const { discountedPrice, discountedTotal, total } = calcTotal({
    discountPercentage: product.discountPercentage,
    price: product.price,
    quantity: 1,
  });

  const stockPercentage = Math.min((product.stock / STOCK_MAX) * 100, 100);

  const updateCartQuantity = useCallback(
    (number: number) => {
      const newQuantity = number < 1 ? 1 : Math.min(number, product.stock);
      shopDispatcher({
        type: "update-cart-quantity",
        payload: { id: product.id, quantity: newQuantity },
      });
    },
    [product],
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current.querySelectorAll(".anim-fade-in"),
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [containerRef], scope: containerRef },
  );

  return (
    <section ref={containerRef} className="space-y-6">
      {/* Brand & Category badges */}
      <main className="anim-fade-in flex flex-wrap items-center gap-3">
        {product.brand && (
          <span className="rounded-full bg-neutral-200/60 px-3 py-1 text-[10px] font-extrabold tracking-widest text-neutral-600 uppercase dark:bg-neutral-800 dark:text-neutral-400">
            {product.brand}
          </span>
        )}
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-extrabold tracking-widest text-indigo-600 uppercase dark:bg-indigo-950/40 dark:text-indigo-400">
          {product.category}
        </span>
      </main>

      {/* Title Header */}
      <main className="anim-fade-in space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
          {product.title}
        </h1>

        {/* Ratings Summary click-anchor */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {renderProductStars(product.rating, "size-4")}
          </div>

          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {product.rating.toFixed(1)}
          </span>

          <span className="h-3.75 w-px bg-neutral-200 dark:bg-neutral-800" />

          <button
            onClick={onReview}
            className="transition-300 cursor-pointer text-sm font-semibold text-neutral-500 hover:text-indigo-600 hover:underline dark:text-neutral-400 dark:hover:text-indigo-400"
          >
            {product.reviews.length} customer reviews
          </button>
        </div>
      </main>

      {/* Pricing Row */}
      <main className="anim-fade-in flex items-baseline gap-3 rounded-2xl border border-neutral-200/50 bg-white p-4 dark:border-neutral-800/40 dark:bg-neutral-900/20">
        <span className="text-3xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
          {formatCurrency(discountedTotal)}
        </span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-lg font-bold text-neutral-400 line-through dark:text-neutral-600">
              {formatCurrency(total)}
            </span>
            <span className="rounded-lg bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
              Save {formatCurrency(discountedPrice)}
            </span>
          </>
        )}
      </main>

      {/* Description snippet */}
      <p className="anim-fade-in text-sm leading-relaxed text-pretty text-neutral-600 dark:text-neutral-400">
        {product.description}
      </p>

      {/* Stock Levels Status */}
      <main className="anim-fade-in space-y-2 rounded-2xl border border-neutral-200/50 bg-white p-4 dark:border-neutral-800/40 dark:bg-neutral-900/20">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="tracking-wider text-neutral-400 uppercase">
            Availability Status
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] tracking-wide uppercase",
              {
                "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400":
                  product.availabilityStatus === "In Stock",
                "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400":
                  product.availabilityStatus === "Low Stock",
                "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400":
                  product.availabilityStatus === "Out of Stock",
              },
            )}
          >
            {product.availabilityStatus}
          </span>
        </div>

        {product.availabilityStatus !== "Out of Stock" && (
          <>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
              <span
                className={cn("transition-300 block h-full rounded-full", {
                  "bg-green-500": product.availabilityStatus === "In Stock",
                  "bg-amber-500": product.availabilityStatus === "Low Stock",
                  "bg-rose-500": product.stock <= STOCK_WARNING,
                })}
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
            <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
              {product.availabilityStatus === "Low Stock"
                ? `Hurry, only ${product.stock} items left in stock!`
                : `${product.stock} items available`}
            </p>
          </>
        )}
      </main>

      {/* Interactive dispatches CTAs */}
      {product.availabilityStatus !== "Out of Stock" && (
        <main className="anim-fade-in flex flex-wrap items-center gap-4">
          {/* Stepper Quantity selection */}
          {existingCartItem && (
            <div className="flex items-center rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
              <button
                type="button"
                onClick={() =>
                  updateCartQuantity(existingCartItem.quantity - 1)
                }
                disabled={existingCartItem.quantity <= 1}
                className="transition-300 flex size-11 cursor-pointer items-center justify-center rounded-l-xl text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-neutral-800"
              >
                <Minus className="size-4" />
              </button>

              <span className="w-12 text-center text-sm font-bold text-neutral-950 dark:text-white">
                {existingCartItem.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateCartQuantity(existingCartItem.quantity + 1)
                }
                disabled={existingCartItem.quantity >= product.stock}
                className="transition-300 flex size-11 cursor-pointer items-center justify-center rounded-r-xl text-neutral-500 hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-30 dark:hover:bg-neutral-800"
              >
                <Plus className="size-4" />
              </button>
            </div>
          )}

          {/* Add to Cart CTA */}
          <button
            onClick={() => {
              if (existingCartItem) {
                shopDispatcher({
                  type: "delete-cart",
                  payload: product.id,
                });
              } else {
                shopDispatcher({
                  type: "add-cart",
                  payload: newCartProduct,
                });
              }
            }}
            className={cn(
              "transition-300 inline-flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-extrabold tracking-wide shadow-sm active:scale-98",
              "bg-indigo-600 text-white shadow-indigo-600/10 hover:bg-indigo-500 hover:shadow-md",
              {
                "border border-neutral-200 bg-neutral-100 text-neutral-700 hover:bg-neutral-200/60 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800":
                  existingCartItem,
              },
            )}
          >
            <ShoppingCart className="size-4.5" />
            <span>{existingCartItem ? "Remove From Cart" : "Add to Cart"}</span>
          </button>

          {/* Add to Wishlist Circle button */}
          <button
            onClick={() => {
              if (isWishlisted) {
                shopDispatcher({
                  type: "delete-wishlist",
                  payload: product.id,
                });
              } else {
                shopDispatcher({
                  type: "add-wishlist",
                  payload: newCartProduct,
                });
              }
            }}
            className={cn(
              "transition-300 flex size-11 cursor-pointer items-center justify-center rounded-xl border shadow-sm active:scale-95",
              "border-neutral-200 bg-white text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950",
              {
                "border-rose-200 bg-rose-50/50 text-rose-500 dark:border-rose-900/30 dark:bg-rose-950/20":
                  isWishlisted,
                "hover:bg-neutral-50 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-white":
                  !isWishlisted,
              },
            )}
            aria-label="Add to Wishlist"
          >
            <Heart
              className={cn("transition-300 size-5", {
                "scale-105 fill-rose-500 text-rose-500": isWishlisted,
              })}
            />
          </button>
        </main>
      )}

      {/* Quick Specifications summary */}
      <main className="anim-fade-in grid grid-cols-1 gap-3 border-t border-neutral-200/50 pt-6 sm:grid-cols-3 dark:border-neutral-800/40">
        <Summary Icon={Truck} title={product.shippingInformation} />
        <Summary Icon={ShieldCheck} title={product.warrantyInformation} />
        <Summary Icon={RotateCcw} title={product.returnPolicy} />
      </main>
    </section>
  );
};

export default Details;

type SummaryProps = {
  title: string;
  Icon: FC<ComponentProps<"svg">>;
};
const Summary = ({ Icon, title }: SummaryProps) => {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
      <Icon className="size-4 shrink-0 text-indigo-500" />
      <span className="line-clamp-1">{title}</span>
    </div>
  );
};
