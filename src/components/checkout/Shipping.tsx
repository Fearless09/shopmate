import { ShippingForm } from "@/app/checkout/page";
import { cn } from "@/lib/utils";
import { CreditCard, Loader2, MoveRight } from "lucide-react";
import { ComponentProps, SubmitEvent, useState } from "react";

type ShippingProps = {
  onSuccess: () => void;
  shippingForm: ShippingForm;
  changeShippingForm: (key: keyof ShippingForm, value: string) => void;
};

const Shipping = ({
  changeShippingForm,
  onSuccess,
  shippingForm,
}: ShippingProps) => {
  const [paymentId, setPaymentId] = useState<PaymentId>("card");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const { address, email, name } = shippingForm;
    if (!name.trim() || !email.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 border-t border-neutral-200/50 pt-4 dark:border-neutral-800"
    >
      <h4 className="text-xs font-extrabold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
        Shipping Details
      </h4>

      <main className="space-y-3">
        <TextInput
          id="name"
          label="Full Name"
          value={shippingForm.name}
          onChange={(e) => changeShippingForm("name", e.target.value)}
          placeholder="John Doe"
        />
        <TextInput
          id="email"
          type="email"
          label="Email Address"
          value={shippingForm.email}
          onChange={(e) => changeShippingForm("email", e.target.value)}
          placeholder="john@example.com"
        />

        <div>
          <label className="mb-1 block text-xs font-bold text-neutral-500 uppercase dark:text-neutral-400">
            Delivery Address
          </label>
          <textarea
            required
            rows={3}
            value={shippingForm.address}
            onChange={(e) => changeShippingForm("address", e.target.value)}
            placeholder="123 Main St, New York, NY"
            className="w-full resize-none rounded-xl border border-neutral-200 bg-white p-2.5 text-xs text-neutral-900 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
          />
        </div>

        <div className="pt-2">
          <label className="mb-1.5 block text-xs font-bold text-neutral-500 uppercase dark:text-neutral-400">
            Payment Method
          </label>

          <div className="grid grid-cols-2 gap-3">
            {paymentMethod.map(({ id, name }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPaymentId(id)}
                className={cn(
                  "transition-300 flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold",
                  paymentId === id
                    ? "border-indigo-600 bg-indigo-50/50 text-indigo-600 dark:border-indigo-500 dark:bg-indigo-950/30 dark:text-indigo-400"
                    : "border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900",
                )}
              >
                {id === "card" && <CreditCard className="size-3.5" />}
                <span>{name}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <button
        type="submit"
        disabled={isSubmitting}
        className="transition-300 mt-4 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-extrabold text-white shadow-md shadow-indigo-600/10 hover:bg-indigo-500 hover:shadow-indigo-600/20 active:scale-98 disabled:pointer-events-none disabled:opacity-40"
      >
        {isSubmitting ? (
          <Loader2 className="size-4.5 animate-spin stroke-4" />
        ) : (
          <>
            <span>Place Order</span>
            <MoveRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default Shipping;

type PaymentId = "card" | "paypal";

const paymentMethod: { id: PaymentId; name: string }[] = [
  { id: "card", name: "Credit Card" },
  { id: "paypal", name: "PayPal" },
];

type TextInputProp = ComponentProps<"input"> & { label: string };
const TextInput = ({ className, label, ...props }: TextInputProp) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-1 block text-xs font-bold text-neutral-500 uppercase dark:text-neutral-400"
      >
        {label}
      </label>
      <input
        required
        className={cn(
          "w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-xs text-neutral-900 shadow-sm focus:border-indigo-500 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white",
          className,
        )}
        {...props}
      />
    </div>
  );
};
