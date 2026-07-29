"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useGSAP(
    () => {
      if (!mounted || !buttonRef.current) return;

      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.3, ease: "power2.out" },
      );

      const icon = buttonRef.current.querySelector("#theme-icon");
      if (!icon) return;
      gsap.fromTo(
        icon,
        { rotate: -180, scale: 0.3, opacity: 0 },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.5)",
        },
      );
    },
    { dependencies: [resolvedTheme, mounted], scope: buttonRef },
  );

  if (!mounted) return <div className="size-9" />;

  return (
    <button
      ref={buttonRef}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "transition-300 relative flex size-9 cursor-pointer items-center justify-center rounded-lg border bg-transparent",
        "border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100",
        "[&_svg]:transition-300 [&_svg]:size-4.75",
      )}
      aria-label="Toggle theme"
    >
      <div
        id="theme-icon"
        className="flex items-center justify-center [&>svg]:size-5"
      >
        {isDark ? (
          <Moon className="fill-indigo-400/20 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]" />
        ) : (
          <Sun className="fill-amber-500/20 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
        )}
      </div>
    </button>
  );
}
