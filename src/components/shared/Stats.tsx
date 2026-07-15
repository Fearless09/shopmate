"use client";

import { useRef } from "react";
import { cn, formatNumber } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { statsData } from "@/data/stats";
import { useGSAP } from "@gsap/react";

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      // Staggered fade in/up of the cards
      gsap.fromTo(
        "#stat-wrap",
        { y: 50, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power4",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Animate the numbers
      statsData.forEach((stat, index) => {
        const element = elementsRef.current[index];
        if (!element) return;

        const countObj = { val: 0 };

        gsap.to(countObj, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          val: stat.targetValue,
          duration: 2.0,
          ease: "power2.out",
          onUpdate: () => {
            if (stat.isDecimal) {
              element.innerText = countObj.val.toFixed(1);
            } else {
              element.innerText = formatNumber(Math.floor(countObj.val));
            }
          },
        });
      });
    },
    { scope: containerRef, dependencies: [statsData] },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-neutral-50 py-16 dark:bg-neutral-900/50"
    >
      <section
        id="stat-wrap"
        className="wrapper grid grid-cols-2 gap-8 md:grid-cols-4"
      >
        {statsData.map((stat, idx) => (
          <main
            key={stat.id}
            className="transition-300 flex flex-col items-center justify-center rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm hover:scale-102 dark:border-neutral-800/60 dark:bg-neutral-950"
          >
            {/* Icon container */}
            <span
              className={cn(
                "mb-4 flex size-12 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-900",
                "[&>svg]:size-6.5",
              )}
            >
              {stat.icon}
            </span>

            {/* Number display */}
            <div className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              <span
                ref={(el) => {
                  elementsRef.current[idx] = el;
                }}
              >
                0
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {stat.suffix}
              </span>
            </div>

            {/* Label */}
            <p className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {stat.label}
            </p>
          </main>
        ))}
      </section>
    </section>
  );
}
