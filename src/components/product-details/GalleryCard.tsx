import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useCallback, useMemo, useState } from "react";

export default function GalleryCard({
  images,
  thumbnail,
  title,
  discountPercentage,
}: Product) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeImage = useMemo(() => {
    return images[activeIndex] ?? thumbnail;
  }, [images, thumbnail, activeIndex]);

  const onSlide = useCallback(
    (direction: "next" | "prev") => {
      setActiveIndex((prev) => {
        if (direction === "next") {
          return prev < images.length - 1 ? prev + 1 : 0;
        }
        return prev > 0 ? prev - 1 : images.length - 1;
      });
    },
    [images.length],
  );

  return (
    <section className="space-y-4 self-start">
      <main className="relative aspect-square w-full overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900/40">
        {activeImage ? (
          <>
            <SliderControl position="left" onClick={() => onSlide("prev")} />
            <Image
              src={activeImage}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="transition-300 object-contain p-6 hover:scale-105"
              priority
              loading="eager"
            />
            <SliderControl position="right" onClick={() => onSlide("next")} />
          </>
        ) : (
          <span className="flex size-full items-center justify-center text-neutral-400">
            No image available
          </span>
        )}

        {/* Discount Stamp Badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-4 left-4 rounded-xl bg-rose-500 px-3 py-1 text-xs font-extrabold tracking-wide text-white shadow-md">
            {Math.round(discountPercentage)}% SAVED
          </span>
        )}
      </main>

      {/* Gallery Thumbnails List */}
      {images && images.length > 1 && (
        <main className="flex flex-wrap gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "transition-300 relative size-20 cursor-pointer overflow-hidden rounded-2xl border bg-white p-1 hover:opacity-90 dark:bg-neutral-900/60",
                "border-neutral-200 dark:border-neutral-800",
                {
                  "border-indigo-600 ring-2 ring-indigo-600/30 dark:border-indigo-400 dark:ring-indigo-400/30":
                    activeImage === img,
                  "hover:border-neutral-300 dark:hover:border-neutral-700":
                    activeImage !== img,
                },
              )}
            >
              <Image
                src={img}
                alt={`${title} Gallery ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain object-center p-1"
              />
            </button>
          ))}
        </main>
      )}
    </section>
  );
}

type SliderControlProps = ComponentProps<"button"> & {
  position: "left" | "right";
};
const SliderControl = ({
  position = "left",
  className,
  type = "button",
  ...props
}: SliderControlProps) => {
  return (
    <button
      className={cn(
        "transition-300 absolute top-1/2 z-2 -translate-y-full cursor-pointer rounded-lg border border-neutral-200 p-1.25 text-neutral-500 backdrop-blur-sm active:scale-95 dark:border-neutral-800 [&>svg]:size-4.75 [&>svg]:stroke-3",
        "ring-indigo-600/30 focus:border-indigo-600 focus:ring-2 dark:ring-indigo-400/30 dark:focus:border-indigo-400",
        { "right-2": position === "right", "left-2": position === "left" },
        className,
      )}
      type={type}
      {...props}
    >
      {position === "left" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
};
