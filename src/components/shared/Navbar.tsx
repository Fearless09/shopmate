"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollY } from "@/hooks/useScrollY";
import Link from "next/link";
import {
  CartAction,
  CategoryAction,
  SearchAction,
  WishlishAction,
} from "../ui/NavBarActionButton";
import { DropdownItem } from "../ui/Dropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScrollY();

  return (
    <header
      className={cn(
        `transition-300 sticky top-0 z-50 w-full border-b border-transparent bg-transparent backdrop-blur-sm`,
        {
          "border-neutral-200 bg-white/70 dark:border-neutral-800 dark:bg-neutral-950/70":
            scrollY > 20,
        },
      )}
    >
      <section className="wrapper flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xl font-bold tracking-tight"
        >
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
            ShopMate
          </span>
          <span className="size-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, name }) => (
            <Link
              key={name}
              href={href}
              className="transition-300 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {name}
            </Link>
          ))}
          <CategoryAction />
        </nav>

        {/* Actions */}
        <main className="hidden items-center gap-4 md:flex">
          <SearchAction />
          <WishlishAction />
          <CartAction />
          <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
          <ThemeToggle />
        </main>

        {/* Mobile Menu & Action Buttons */}
        <main className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <CartAction />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "transition-300 flex size-9 cursor-pointer items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900",
              "[&_svg]:size-5",
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </main>
      </section>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "Shop", href: "/products" },
  // { name: "Categories", href: "/products" },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  if (!isOpen) return;

  return (
    <section
      className={cn(
        "border-b border-neutral-200 bg-white py-4 shadow-lg duration-200 md:hidden dark:border-neutral-800 dark:bg-neutral-950",
      )}
    >
      <nav className="flex flex-col">
        {navLinks.map(({ href, name }) => (
          <Link
            key={name}
            href={href}
            onClick={() => onClose()}
            className="text-sm font-medium"
          >
            <DropdownItem>{name}</DropdownItem>
          </Link>
        ))}
      </nav>
    </section>
  );
};
