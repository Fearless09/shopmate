import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ComponentProps, FC } from "react";

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: FC<ComponentProps<"svg">>;
}

export const featuresList: FeatureItem[] = [
  {
    id: 1,
    title: "Free Express Shipping",
    description:
      "Enjoy complimentary express delivery on all orders over $150, including tracking updates.",
    icon: Truck,
  },
  {
    id: 2,
    title: "Secure SSL Checkout",
    description:
      "Your financial details are encrypted using banking-grade security protocols.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "24/7 Dedicated Support",
    description:
      "Our customer service specialists are ready to answer your inquiries around the clock.",
    icon: Headphones,
  },
  {
    id: 4,
    title: "30-Day Free Returns",
    description:
      "Not satisfied? Return any unopened merchandise within 30 days for a full refund.",
    icon: RotateCcw,
  },
];
