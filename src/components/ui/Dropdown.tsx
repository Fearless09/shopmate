import { useShop } from "@/context/ShopContext";
import { gsap } from "@/lib/gsap";
import { cn, formatCurrency } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ComponentProps, useRef } from "react";

type DropdownWrapperProp = ComponentProps<"main"> & {
  isOpen: boolean;
  xPosition?: "left" | "right";
};

export const DropdownWrapper = ({
  isOpen,
  className,
  xPosition = "right",
  ...props
}: DropdownWrapperProp) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        );
      } else {
        gsap.to(ref.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    },
    { scope: ref, dependencies: [isOpen] },
  );

  return (
    <main
      ref={ref}
      className={cn(
        "absolute z-5 mt-2 max-h-75 w-full scrollbar-none overflow-x-clip overflow-y-auto rounded-xl border border-neutral-100 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-950",
        { "left-0": xPosition === "left", "right-0": xPosition === "right" },
        className,
        { "pointer-events-none opacity-0": !isOpen },
      )}
      {...props}
    />
  );
};

type DropdownItemProp = ComponentProps<"div">;

export const DropdownItem = ({ className, ...props }: DropdownItemProp) => {
  return (
    <div
      className={cn(
        "transition-300 flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-sm",
        "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white",
        className,
      )}
      {...props}
    />
  );
};

const MIN_QUANTITY = 1;
export const CartDropdownItem = ({
  discountPercentage,
  discountedTotal,
  id,
  price,
  quantity,
  thumbnail,
  title,
  compType = "cart",
  onclick,
}: CartProduct & {
  compType?: "cart" | "wishlist" | "search";
  onclick?: () => void;
}) => {
  const router = useRouter();
  const { shopDispatcher, products } = useShop();

  const product = products.find((product) => product.id);
  const MAX_QUANTITY = product?.stock || 15;

  const updateQuantity = (num: number) => {
    const updateQty =
      num < MIN_QUANTITY
        ? MIN_QUANTITY
        : num > MAX_QUANTITY
          ? MAX_QUANTITY
          : num;

    shopDispatcher({
      type: "update-cart-quantity",
      payload: { id, quantity: updateQty },
    });
  };

  const removeItem = () => {
    if (compType === "cart") {
      shopDispatcher({ type: "delete-cart", payload: id });
    } else if (compType === "wishlist") {
      shopDispatcher({ type: "delete-wishlist", payload: id });
    }
  };

  return (
    <DropdownItem
      className="group gap-3 p-2"
      onClick={() => {
        onclick?.();
        router.push(`/products/${id}`);
      }}
    >
      <div className="transition-300 relative size-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100 group-hover:bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-950">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="64px"
          className="object-cover object-center"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-1.5">
          <h4 className="line-clamp-1 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {title}
          </h4>
          {compType !== "search" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem();
              }}
              aria-label={`Remove ${title} from cart`}
              className="transition-300 cursor-pointer text-neutral-400 hover:text-neutral-500 dark:text-neutral-700 dark:hover:text-neutral-400"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="text-sm font-bold text-neutral-900 dark:text-white">
            {formatCurrency(discountedTotal / quantity)}
          </span>
          {discountPercentage && (
            <span className="text-xs text-neutral-400 line-through dark:text-neutral-600">
              {formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Quantity Stepper */}
        {compType === "cart" && (
          <div
            className="mt-2 flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => updateQuantity(quantity - 1)}
                disabled={quantity <= MIN_QUANTITY}
                aria-label="Decrease quantity"
                className="transition-300 flex size-7 cursor-pointer items-center justify-center rounded-l-lg text-neutral-500 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-900"
              >
                <Minus className="size-3" />
              </button>

              <input
                type="text"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => {
                  // allow only digits while typing
                  const digitsOnly = Number(e.target.value.replace(/\D/g, ""));
                  updateQuantity(digitsOnly);
                }}
                // onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
                aria-label={`Quantity for ${title}`}
                className="h-7 w-9 border-x border-neutral-200 bg-transparent text-center text-xs font-semibold text-neutral-600 outline-none dark:border-neutral-800 dark:text-neutral-400"
              />

              <button
                onClick={() => updateQuantity(quantity + 1)}
                disabled={quantity >= MAX_QUANTITY}
                aria-label="Increase quantity"
                className="transition-300 flex size-7 cursor-pointer items-center justify-center rounded-r-lg text-neutral-500 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:text-neutral-400 dark:hover:bg-neutral-900"
              >
                <Plus className="size-3" />
              </button>
            </div>

            <span className="text-sm font-bold text-neutral-900 dark:text-white">
              {formatCurrency(discountedTotal)}
            </span>
          </div>
        )}
      </div>
    </DropdownItem>
  );
};
