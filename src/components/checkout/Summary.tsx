import { cn, formatCurrency } from "@/lib/utils";

type SummaryProps = { cart: Cart };

const Summary = ({ cart }: SummaryProps) => {
  return (
    <>
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
        Order Summary
      </h3>

      {/* Costs details summary */}
      <main className="mt-4 divide-y divide-neutral-100 text-sm dark:divide-neutral-800">
        <SummaryItem
          label="Total Items Count"
          value={cart.totalQuantity.toString()}
        />
        <SummaryItem
          label="Subtotal (Original)"
          value={formatCurrency(cart.total)}
          type="original"
        />
        {cart.total - cart.discountedTotal > 0 && (
          <SummaryItem
            label="Savings Discount"
            value={"-" + formatCurrency(cart.total - cart.discountedTotal)}
            type="success"
          />
        )}
        <SummaryItem label="Delivery Fee" value="Free" type="success" />
        <SummaryItem
          label="Final Total to Pay"
          value={formatCurrency(cart.discountedTotal)}
          type="total"
        />
      </main>
    </>
  );
};

export default Summary;

type SummaryItemProps = {
  label: string;
  value: string;
  type?: "original" | "success" | "total";
};
const SummaryItem = ({ label, value, type }: SummaryItemProps) => {
  return (
    <div className="flex justify-between py-2.5">
      <span
        className={cn("text-neutral-500 dark:text-neutral-400", {
          "font-bold text-neutral-900 dark:text-white": type === "total",
        })}
      >
        {label}
      </span>
      <span
        className={cn("font-bold text-neutral-900 dark:text-white", {
          "font-semibold text-neutral-500 line-through dark:text-neutral-500":
            type === "original",
          "text-emerald-600 dark:text-emerald-400": type === "success",
          "text-base text-indigo-600 dark:text-indigo-400": type === "total",
        })}
      >
        {value}
      </span>
    </div>
  );
};
