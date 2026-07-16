import { Star } from "lucide-react";
import { cn } from "./utils";

export const renderProductStars = (
  rating: number,
  size: string = "size-3.5",
) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star key={i} className={cn("fill-amber-400 text-amber-400", size)} />,
      );
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(
        <div key={i} className="relative">
          <Star
            className={cn("text-neutral-300 dark:text-neutral-700", size)}
          />
          <div className="absolute inset-y-0 left-0 w-[55%] overflow-hidden">
            <Star className={cn("fill-amber-400 text-amber-400", size)} />
          </div>
        </div>,
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={cn("text-neutral-300 dark:text-neutral-700", size)}
        />,
      );
    }
  }
  return stars;
};

export const reviewsStat = (reviews: ProductReview[]) => {
  let stats = [
    { id: "5", value: 0, per: 0 },
    { id: "4", value: 0, per: 0 },
    { id: "3", value: 0, per: 0 },
    { id: "2", value: 0, per: 0 },
    { id: "1", value: 0, per: 0 },
  ];

  reviews.forEach((r) => {
    const idx = stats.findIndex((i) => i.id === r.rating.toString());

    if (idx === -1) return;
    stats[idx].value += 1;
    stats[idx].per = Math.round((stats[idx].value / reviews.length) * 100);
  });

  return stats;
};
