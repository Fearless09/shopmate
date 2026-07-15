import { HeartHandshake, ShoppingBag, Store, Users } from "lucide-react";

export interface StatItem {
  id: number;
  targetValue: number;
  label: string;
  suffix: string;
  icon: React.ReactNode;
  isDecimal?: boolean;
}

export const statsData: StatItem[] = [
  {
    id: 1,
    targetValue: 15400,
    label: "Active Customers",
    suffix: "+",
    icon: <Users className="text-indigo-600 dark:text-indigo-400" />,
  },
  {
    id: 2,
    targetValue: 480,
    label: "Premium Products",
    suffix: "+",
    icon: <ShoppingBag className="text-violet-600 dark:text-violet-400" />,
  },
  {
    id: 3,
    targetValue: 24,
    label: "Global Outlets",
    suffix: "+",
    icon: <Store className="text-emerald-600 dark:text-emerald-400" />,
  },
  {
    id: 4,
    targetValue: 99.8,
    label: "Customer Rating",
    suffix: "%",
    icon: <HeartHandshake className="text-rose-600 dark:text-rose-400" />,
    isDecimal: true,
  },
];
