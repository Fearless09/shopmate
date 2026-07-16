"use client";

import SimilarProduct from "@/components/shared/SimilarProduct";
import { EmptyState } from "@/components/ui/EmptyState";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <main className="bg-neutral-50 py-20 dark:bg-neutral-950">
      <main className="flex items-center justify-center">
        <EmptyState
          icon={Info}
          title="Product Not Found"
          description="We couldn't resolve the product details. It may have been removed or catalog is empty."
          actionText="Back to Shop Catalog"
          onAction={() => router.push("/products")}
        />
      </main>

      <SimilarProduct />
    </main>
  );
};

export default NotFound;
