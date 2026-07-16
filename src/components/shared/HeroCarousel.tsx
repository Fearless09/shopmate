"use client";

import { useState, useEffect, useRef, ComponentProps } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SLIDES } from "@/data/slides";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeroCarousel() {
  const [current, setCurrent] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function init() {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        handleCarousel("next");
      }, 6000);
    }
    init();

    return () => init();
  }, [current]);

  // GSAP animation when the slide changes
  useGSAP(
    () => {
      // Outgoing values resetting
      gsap.killTweensOf([
        "#slide-title",
        "#slide-subtitle",
        "#slide-desc",
        "#slide-actions",
        "#slide-image",
      ]);

      // Set initial states
      gsap.set(
        ["#slide-title", "#slide-subtitle", "#slide-desc", "#slide-actions"],
        {
          y: 30,
          opacity: 0,
        },
      );
      gsap.set("#slide-image", {
        scale: 0.85,
        opacity: 0,
        rotate: -2,
      });

      // Timeline for incoming animation
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      tl.to("#slide-image", {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
      })
        .to(
          "#slide-title",
          {
            y: 0,
            opacity: 1,
          },
          "-=0.9",
        )
        .to(
          "#slide-subtitle",
          {
            y: 0,
            opacity: 1,
          },
          "-=0.8",
        )
        .to(
          "#slide-desc",
          {
            y: 0,
            opacity: 1,
          },
          "-=0.7",
        )
        .to(
          "#slide-actions",
          {
            y: 0,
            opacity: 1,
          },
          "-=0.6",
        );

      // Soft breathing hover/idle animation on image
      gsap.to("#slide-image", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1.2,
      });
    },
    { dependencies: [current], scope: containerRef },
  );

  const handleCarousel = (action: "next" | "prev") => {
    switch (action) {
      case "next": {
        setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        break;
      }
      case "prev": {
        setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
        break;
      }
      default: {
        setCurrent(0);
        break;
      }
    }
  };
  const slide = SLIDES[current];

  return (
    <section
      ref={containerRef}
      className={cn(
        `transition-300 relative w-full overflow-hidden bg-linear-to-br py-12 md:py-20 lg:py-24`,
        slide.bgGradient,
      )}
    >
      <section className="wrapper">
        <section className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Content Left */}
          <main className="flex flex-col justify-center space-y-6 text-left">
            <span
              className={cn(
                `flex w-max items-center rounded-full bg-linear-to-r px-3 py-1 text-xs font-semibold tracking-wider text-white shadow-sm`,
                slide.accentColor,
              )}
            >
              {slide.tag}
            </span>

            <div className="space-y-3">
              <h2
                id="slide-title"
                className="text-sm font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400"
              >
                {slide.title}
              </h2>
              <h1
                id="slide-subtitle"
                className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl dark:text-white"
              >
                {slide.subtitle}
              </h1>
            </div>

            <p
              id="slide-desc"
              className="max-w-md text-base text-pretty text-neutral-600 sm:text-lg dark:text-neutral-300"
            >
              {slide.description}
            </p>

            <div id="slide-actions" className="flex items-center gap-4 pt-2">
              <Link
                href={"/products"}
                className={cn(
                  `transition-300 rounded-xl bg-linear-to-r px-6 py-3.5 text-sm font-semibold text-white hover:scale-102 active:scale-98`,
                  slide.accentColor,
                )}
              >
                Shop Collection
              </Link>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                  Starting at
                </span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  {slide.price}
                </span>
              </div>
            </div>
          </main>

          {/* Image Right */}
          <main className="flex items-center justify-center">
            <main
              id="slide-image"
              className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/20 bg-neutral-200/40 p-4 shadow-2xl backdrop-blur-sm sm:max-w-[400px] md:max-w-[480px] dark:bg-neutral-800/20"
            >
              {/* Decorative Circle Gradients */}
              <span
                className={cn(
                  "absolute -top-12 -right-12 size-48 rounded-full bg-linear-to-r opacity-20 blur-3xl",
                  slide.accentColor,
                )}
              />
              <span className="absolute -bottom-12 -left-12 size-48 rounded-full bg-neutral-500 opacity-10 blur-3xl" />

              <div className="relative size-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-900">
                <Image
                  src={slide.image}
                  alt={slide.subtitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  preload={current === 0 ? true : false}
                />
              </div>
            </main>
          </main>
        </section>

        {/* Carousel controls */}
        <Control
          current={current}
          handleCarousel={handleCarousel}
          handleCurrent={setCurrent}
        />
      </section>
    </section>
  );
}

interface ControlProps {
  current: number;
  handleCurrent: (index: number) => void;
  handleCarousel: (action: "next" | "prev") => void;
}

const Control = ({ current, handleCarousel, handleCurrent }: ControlProps) => {
  return (
    <section className="mt-12 flex items-center justify-between md:mt-16">
      {/* Navigation dots */}
      <main className="flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleCurrent(idx)}
            className={cn(
              `transition-300 size-2.75 cursor-pointer rounded-full bg-neutral-300 dark:bg-neutral-700`,
              {
                "w-10 bg-neutral-800 dark:bg-white": current === idx,
                "hover:bg-neutral-400": current !== idx,
              },
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </main>

      {/* Arrow Buttons */}
      <main className="flex items-center gap-3">
        <Button
          onClick={() => handleCarousel("prev")}
          aria-label="Previous slide"
        >
          <ArrowLeft />
        </Button>

        <Button onClick={() => handleCarousel("next")} aria-label="Next slide">
          <ArrowRight />
        </Button>
      </main>
    </section>
  );
};

type ButtonProps = ComponentProps<"button">;
const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        `transition-300 flex size-10 cursor-pointer items-center justify-center rounded-full border active:scale-95`,
        "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        "[&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
};
