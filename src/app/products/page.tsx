import { Suspense } from "react";

import { ProductsPageSkeleton } from "@/components/ui/Skeleton";
import ProductsCatalog from "@/components/product-page";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsCatalog />
    </Suspense>
  );
}
