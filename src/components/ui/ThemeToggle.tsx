"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group transition-300 relative flex size-9 cursor-pointer items-center justify-center rounded-lg border bg-transparent",
        "border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100",
        "[&_svg]:transition-300 [&_svg]:size-4.75",
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="group-hover:rotate-45" />
      ) : (
        <Moon className="group-hover:-rotate-15" />
      )}
    </button>
  );
}
