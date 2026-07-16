import { ShippingForm } from "@/app/checkout/page";
import { useShop } from "@/context/ShopContext";
import { cn, formatCurrency } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { MoveRight } from "lucide-react";

type SuccessProps = {
  onClose: () => void;
  shippingForm: ShippingForm;
  cart: Cart;
};

const Success = ({ cart, onClose, shippingForm }: SuccessProps) => {
  const { shopDispatcher } = useShop();

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-md">
      <section className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
        {/* Visual Elements */}
        <span className="absolute -top-20 -left-20 size-40 rounded-full bg-indigo-500/10 blur-2xl" />
        <span className="absolute -right-20 -bottom-20 size-40 rounded-full bg-emerald-500/10 blur-2xl" />

        <main className="animate-fade-in relative z-10 flex flex-col items-center">
          <span className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 shadow-inner dark:bg-emerald-950/30 dark:text-emerald-400">
            <DotLottieReact
              src="/success.lottie"
              className="size-25"
              autoplay
            />
          </span>

          <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">
            Order Placed Successfully!
          </h2>

          <p className="mt-3 text-sm text-pretty text-neutral-500 dark:text-neutral-400">
            Thank you for your purchase,{" "}
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {shippingForm.name}
            </span>
            ! Your simulated order has been created.
          </p>

          <main className="mt-6 w-full space-y-2.5 rounded-2xl border border-neutral-200/50 bg-neutral-50 p-4 text-left text-xs dark:border-neutral-800/40 dark:bg-neutral-950/60">
            <ItemRow label="Confirmation Email:" value={shippingForm.email} />
            <ItemRow
              label="Total Paid:"
              value={formatCurrency(cart.discountedTotal)}
              colored
            />
            <ItemRow label="Shipment Address:" value={shippingForm.address} />
          </main>

          <button
            onClick={() => {
              shopDispatcher({ type: "clear-cart" });
              onClose();
            }}
            className="transition-300 mt-8 flex h-11 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 text-sm font-extrabold text-white shadow-md hover:bg-indigo-500 hover:shadow-indigo-600/10 active:scale-98"
          >
            <span>Continue Shopping</span>
            <MoveRight className="size-4" />
          </button>
        </main>
      </section>
    </section>
  );
};

export default Success;

type ItemRowProps = { label: string; value: string; colored?: boolean };
const ItemRow = ({ label, value, colored }: ItemRowProps) => {
  return (
    <div className="flex justify-between">
      <span className="font-semibold text-neutral-400">{label}</span>
      <span
        className={cn("font-bold text-neutral-800 dark:text-neutral-200", {
          "text-indigo-600 dark:text-indigo-400": colored,
        })}
      >
        {value}
      </span>
    </div>
  );
};
