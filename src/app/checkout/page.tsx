"use client";

import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { EmptyState } from "@/components/ui/EmptyState";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import SimilarProduct from "@/components/shared/SimilarProduct";
import Banner from "@/components/shared/Banner";
import CartItems from "@/components/checkout/CartItems";
import Summary from "@/components/checkout/Summary";
import Shipping from "@/components/checkout/Shipping";
import Success from "@/components/checkout/Success";

export type ShippingForm = {
  name: string;
  email: string;
  address: string;
};

export default function CheckoutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { cart, products } = useShop();

  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    name: "",
    email: "",
    address: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const resolvedCartProducts = useMemo(() => {
    if (products.length === 0 || !cart || cart.products.length === 0) return [];

    const productMap = new Map(products.map((p) => [p.id, p]));

    return cart.products
      .map((cartP) => productMap.get(cartP.id))
      .filter((p) => typeof p !== "undefined");
  }, [products, cart]);

  // GSAP animation staggered loads
  useGSAP(
    () => {
      if (!containerRef.current || cart?.products.length === 0) return;

      gsap.fromTo(
        containerRef.current.querySelectorAll(".summary-anim"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power2.out" },
      );
    },
    { dependencies: [cart?.products.length], scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="bg-neutral-50 pb-24 text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
    >
      {/* Checkout Page Header Banner */}
      <Banner
        description="Review your shopping cart, fill in delivery details, and place your order."
        title="Secure Checkout"
        tag="Checkout"
      />

      {/* Main Content Layout */}
      <section className="wrapper mt-10">
        {!cart || cart.products.length === 0 ? (
          <main className="py-12">
            <EmptyState
              icon={ShoppingBag}
              title="Your Cart is Empty"
              description="You have no items in your cart. Head back to the store catalog to add products."
              actionText="Browse Shop Catalog"
              onAction={() => router.push("/products")}
            />
          </main>
        ) : (
          <main className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <CartItems cart={cart} />

            <aside>
              <section className="summary-anim sticky top-24 rounded-3xl border border-neutral-200 bg-white px-4 py-6 shadow-sm sm:p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
                <Summary cart={cart} />
                <Shipping
                  onSuccess={() => setIsSuccess(true)}
                  changeShippingForm={(key, val) =>
                    setShippingForm((prev) => ({ ...prev, [key]: val }))
                  }
                  shippingForm={shippingForm}
                />
              </section>
            </aside>
          </main>
        )}
      </section>
      <SimilarProduct product={resolvedCartProducts} />

      {isSuccess && cart && (
        <Success
          cart={cart}
          onClose={() => {
            setIsSuccess(false);
            router.push("/");
          }}
          shippingForm={shippingForm}
        />
      )}
    </main>
  );
}
