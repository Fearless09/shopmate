"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { X, Heart, Star, ShoppingCart } from "lucide-react";
import { useShop } from "@/context/ShopContextC";
import { formatCurrency } from "@/lib/utils";

export default function ProductModal() {
  const {
    activeProduct,
    setActiveProduct,
    addToCart,
    toggleWishlist,
    wishlist,
  } = useShop();

  // Local state to keep track of the product during close animation
  const [localProduct, setLocalProduct] = useState<PRODUCT | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeProduct) {
      setLocalProduct(activeProduct);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // GSAP Intro/Outro trigger
  useEffect(() => {
    if (activeProduct) {
      // Intro animations
      const ctx = gsap.context(() => {
        gsap.killTweensOf([overlayRef.current, modalRef.current]);

        // Initial state
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(modalRef.current, { scale: 0.9, y: 30, opacity: 0 });

        // Timeline
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.5 },
        });

        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 }).to(
          modalRef.current,
          { scale: 1, y: 0, opacity: 1, duration: 0.5 },
          "-=0.15",
        );
      });
      return () => ctx.revert();
    }
  }, [activeProduct]);

  if (!localProduct || !activeProduct) return null;

  const isWishlisted = wishlist.includes(localProduct.id);

  const handleClose = () => {
    // Outro animation then clear context
    gsap
      .timeline({
        defaults: { ease: "power3.in", duration: 0.3 },
        onComplete: () => {
          setActiveProduct(null);
          setLocalProduct(null);
        },
      })
      .to(modalRef.current, { scale: 0.92, y: 20, opacity: 0 })
      .to(overlayRef.current, { opacity: 0 }, "-=0.2");
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />,
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-neutral-300 dark:text-neutral-700" />
            <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="h-4 w-4 text-neutral-300 dark:text-neutral-700"
          />,
        );
      }
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Dark Blur Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden overflow-y-auto rounded-3xl border border-neutral-200 bg-white shadow-2xl md:max-h-none md:flex-row md:overflow-y-visible dark:border-neutral-800 dark:bg-neutral-950"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all hover:bg-neutral-200 active:scale-95 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Image Section */}
        <div className="relative flex aspect-square w-full items-center justify-center bg-neutral-50 p-6 md:w-1/2 dark:bg-neutral-900">
          <div className="relative h-full max-h-[350px] w-full max-w-[350px] overflow-hidden rounded-2xl border border-neutral-100 bg-white p-2 dark:border-neutral-900 dark:bg-neutral-950">
            <Image
              src={localProduct.image}
              alt={localProduct.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 transition-transform duration-500 hover:scale-102"
              loading="eager"
            />
          </div>
        </div>

        {/* Right Column: Info & Actions */}
        <div
          ref={bodyRef}
          className="flex w-full flex-col justify-between p-6 text-left md:w-1/2 md:p-8"
        >
          <div className="space-y-4">
            {/* Category Tag */}
            <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
              {localProduct.category}
            </span>

            {/* Title */}
            <h2
              ref={titleRef}
              className="text-xl leading-snug font-extrabold text-neutral-900 md:text-2xl dark:text-white"
            >
              {localProduct.title}
            </h2>

            {/* Ratings and Reviews */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {renderStars(localProduct.rating.rate)}
              </div>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                {localProduct.rating.rate}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                • {localProduct.rating.count} Customer reviews
              </span>
            </div>

            <div className="h-px bg-neutral-100 dark:bg-neutral-900" />

            {/* Price */}
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {formatCurrency(localProduct.price)}
            </div>

            {/* Description */}
            <p className="max-h-[160px] overflow-y-auto pr-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {localProduct.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToCart(localProduct.id)}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-102 hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-98"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Shopping Cart
            </button>

            <button
              onClick={() => toggleWishlist(localProduct.id)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-semibold transition-all active:scale-98 ${
                isWishlisted
                  ? "border-rose-200 bg-rose-50/30 text-rose-600 dark:border-rose-950 dark:bg-rose-950/10 dark:text-rose-400"
                  : "border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900"
              }`}
            >
              <Heart
                className={`h-4.5 w-4.5 ${isWishlisted ? "fill-current" : ""}`}
              />
              {isWishlisted ? "Favorited" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
