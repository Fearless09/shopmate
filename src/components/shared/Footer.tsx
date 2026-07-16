"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { FacebookSvg, GithubSvg, InstagramSvg, TwitterSvg } from "../ui/Svgs";
import { useShop } from "@/context/ShopContext";

export default function Footer() {
  const { categories } = useShop();

  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-900 text-neutral-400 dark:bg-black dark:text-neutral-500">
      <section className="wrapper py-16">
        <main className="flex flex-wrap justify-between gap-10">
          {/* Logo & Intro */}
          <div className="max-w-xs flex-1 space-y-6">
            <Link href={"/"} className="flex w-max items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">
                Shopmate
              </span>
              <span className="size-1.5 rounded-full bg-indigo-500"></span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-neutral-400 dark:text-neutral-500">
              Your ultimate online store for curated premium products.
              Delivering style, convenience, and high-fidelity tech right to
              your doorstep.
            </p>

            <div className="flex items-center gap-4">
              {socialMedia.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="transition-300 rounded-lg bg-neutral-800 p-2 text-neutral-400 hover:text-white dark:bg-neutral-900"
                  aria-label={s.name}
                >
                  <s.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {categories.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
                Shop Categories
              </h3>

              <ul className="space-y-3 text-sm">
                {[...categories].slice(1, 5).map(({ slug, name }) => (
                  <li key={slug}>
                    <Link
                      href={`/products?category=${slug}`}
                      className="transition-300 capitalize hover:text-white"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Customer Care
            </h3>
            <ul className="space-y-3 text-sm">
              {support.map(({ href, name }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="transition-300 capitalize hover:text-white"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="max-w-60 flex-1">
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-3 text-sm">
              {contact.map((c) => (
                <li key={c.name} className="flex items-start gap-2.5">
                  <c.icon className="mt-0.5 size-4 shrink-0 text-indigo-500" />
                  <span>{c.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <hr className="my-12 border-neutral-800" />

        <main className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Shopmate Inc. All rights reserved.</p>

          <div className="flex gap-6">
            {policyLinks.map(({ href, name }) => (
              <Link
                key={name}
                href={href}
                className="transition-300 hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>
        </main>
      </section>
    </footer>
  );
}

const policyLinks = [
  { name: "Privacy Policy", href: "/" },
  { name: "Terms of Service", href: "/" },
  { name: "Cookie Preferences", href: "/" },
];

const socialMedia = [
  { name: "Facebook", href: "/", icon: FacebookSvg },
  { name: "Twitter", href: "/", icon: TwitterSvg },
  { name: "Instagram", href: "/", icon: InstagramSvg },
  { name: "GitHub", href: "/", icon: GithubSvg },
];

const support = [
  { name: "Track Orders", href: "/" },
  { name: "Shipping Info", href: "/" },
  { name: "Returns & Refunds", href: "/" },
  { name: "Store Locator", href: "/" },
];

const contact = [
  {
    name: "128 Fashion Boulevard, Suite 500, New York, NY 10001",
    icon: MapPin,
  },
  { name: "+1 (800) 555-0199", icon: Phone },
  { name: "info@shopmate.com", icon: Mail },
];
