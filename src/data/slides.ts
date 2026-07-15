export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  price: string;
  image: string;
  accentColor: string;
  bgGradient: string;
}

export const SLIDES: SlideItem[] = [
  {
    id: 1,
    tag: "NEW RELEASE",
    title: "Next-Gen Audio Experience",
    subtitle: "AeroSound Max Wireless",
    description:
      "Immerse yourself in deep spatial audio and hybrid noise cancellation. Enjoy 40 hours of unmatched comfort and clarity.",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    accentColor: "from-indigo-600 to-violet-600",
    bgGradient:
      "from-indigo-50/40 via-white to-violet-50/20 dark:from-indigo-900/20 dark:via-neutral-900 dark:to-violet-900/10",
  },
  {
    id: 2,
    tag: "SIGNATURE WATCH",
    title: "Timeless Minimal Design",
    subtitle: "Shopmate Edition Series 4",
    description:
      "Brushed surgical-grade stainless steel paired with hand-finished Italian leather. Crafted for those who appreciate simplicity.",
    price: "$149.00",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
    accentColor: "from-amber-500 to-orange-600",
    bgGradient:
      "from-amber-50/50 via-white to-orange-50/30 dark:from-amber-900/10 dark:via-neutral-900 dark:to-orange-900/10",
  },
  {
    id: 3,
    tag: "WINTER ESSENTIALS",
    title: "Pure Merino Wool Coats",
    subtitle: "The Nomad Trench Coat",
    description:
      "Australian Merino Wool offering natural temperature regulation, wind protection, and an elegant double-breasted drape.",
    price: "$245.00",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    accentColor: "from-emerald-600 to-teal-600",
    bgGradient:
      "from-emerald-50/40 via-white to-teal-50/30 dark:from-emerald-900/10 dark:via-neutral-900 dark:to-teal-900/10",
  },
];
