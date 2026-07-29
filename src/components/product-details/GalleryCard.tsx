import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryCard({
  images,
  thumbnail,
  title,
  discountPercentage,
}: Product) {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (images.length === 0 && !thumbnail) return;
    setActiveImage(images[0] || thumbnail);
  }, [images, thumbnail]);

  return (
    <section className="space-y-4 self-start">
      <main className="relative aspect-square w-full overflow-hidden rounded-3xl border border-neutral-200/60 bg-white shadow-sm dark:border-neutral-800/60 dark:bg-neutral-900/40">
        {images && images.length > 0 ? (
          <Image
            src={activeImage || thumbnail}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="transition-300 object-contain p-6 hover:scale-105"
            priority
            loading="eager"
          />
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
              onClick={() => setActiveImage(img)}
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
