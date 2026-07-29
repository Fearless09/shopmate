"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { featuresList } from "@/data/features";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef, dependencies: [featuresList] },
  );

  return (
    <section
      id="features"
      className="w-full bg-white py-20 dark:bg-neutral-950"
    >
      <section className="wrapper">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <span className="block text-xs font-bold tracking-wider text-indigo-600 uppercase dark:text-indigo-400">
            Why Shopmate
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Elevating Your Shopping Experience
          </h2>

          <p className="mt-4 text-base text-pretty text-neutral-500 dark:text-neutral-400">
            We combine high-quality curation with seamless delivery and
            post-purchase support so you can shop with complete peace of mind.
          </p>
        </header>

        <main
          ref={containerRef}
          className="grid grid-cols-1 gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuresList.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "group transition-300 flex flex-col rounded-2xl border py-6 px-5 sm:p-6 shadow-md hover:-translate-y-1 hover:shadow-lg",
                "border-neutral-100 bg-neutral-50 hover:border-indigo-100 hover:bg-indigo-50/10 hover:shadow-indigo-500/5",
                "dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-indigo-950 dark:hover:bg-indigo-950/10",
              )}
            >
              {/* Icon */}
              <span className="transition-300 mb-5 flex size-12 items-center justify-center rounded-xl border border-neutral-200/50 bg-white shadow-sm group-hover:scale-110 group-hover:border-indigo-200 dark:border-neutral-800 dark:bg-neutral-900 dark:group-hover:border-indigo-900">
                <feature.icon className="size-6 text-indigo-600 dark:text-indigo-400" />
              </span>

              {/* Title */}
              <h3 className="transition-300 text-lg font-bold text-neutral-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </main>
      </section>
    </section>
  );
}
