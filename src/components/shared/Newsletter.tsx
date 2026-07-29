"use client";

import { useState, SubmitEvent, useRef } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Newsletter() {
  const containerRef = useRef<HTMLElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { contextSafe } = useGSAP({
    scope: containerRef,
    dependencies: [status],
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");

      contextSafe(() => {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.9, opacity: 0.5 },
          { scale: 1, opacity: 1, duration: 1 },
        );
      });
    }, 1500);
  };

  return (
    <section className="relative w-full overflow-hidden bg-neutral-50 py-20 dark:bg-neutral-900/40">
      {/* Background decorations */}
      <span className="absolute top-1/2 left-1/4 size-64 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      <span className="absolute top-1/2 right-1/4 size-64 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <section className="wrapper relative max-w-5xl">
        <section className="rounded-3xl border border-neutral-200/60 bg-white px-5 py-8 shadow-xl backdrop-blur-md md:py-12 dark:border-neutral-800/60 dark:bg-neutral-950/80">
          <section className="mx-auto max-w-2xl space-y-6 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              STAY TUNED
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-4xl dark:text-white">
              Subscribe to Our Newsletter
            </h2>

            <p className="text-pretty text-neutral-500 dark:text-neutral-400">
              Get notified about new collection arrivals, limited editions,
              weekly trends, and special membership-only promotions.
            </p>

            <main ref={containerRef}>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center space-y-3 py-4 text-emerald-600 duration-300 dark:text-emerald-400">
                  <DotLottieReact
                    src="/success.lottie"
                    className="size-25"
                    autoplay
                  />

                  <p className="text-lg font-bold">Successfully Subscribed!</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Thank you for joining. Check your inbox soon!
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 pt-2 sm:flex-row"
                >
                  <div className="relative grow">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                      <Mail className="size-5" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Enter your email address"
                      className="block w-full rounded-xl border border-neutral-300 bg-white py-3.5 pr-4 pl-11 text-sm text-neutral-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="transition-300 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-neutral-800 active:scale-98 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                  >
                    {status === "loading" ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              )}
            </main>

            <p className="text-xs text-pretty text-neutral-400 dark:text-neutral-500">
              We care about your privacy. You can unsubscribe at any time. Read
              our Privacy Policy.
            </p>
          </section>
        </section>
      </section>
    </section>
  );
}
