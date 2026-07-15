import { Suspense } from "react";

import { ProductsPageSkeleton } from "@/components/ui/Skeleton";
import ProductsCatalog from "@/components/product-page";
import Banner from "@/components/product-page/Banner";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <Banner />
      <ProductsCatalog />
    </Suspense>
  );
}
