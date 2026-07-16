"use client";

import { useShop } from "@/context/ShopContext";
import { filterProduct } from "@/lib/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { scrollToById } from "@/lib/utils";
import Toolbar from "./Toolbar";
import ProductionSection from "./ProductSection";
import Pagination from "./Pagination";
import MobileDrawer from "./MobileDrawer";
import Banner from "../shared/Banner";

export default function ProductsCatalog() {
  const { products } = useShop();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Search parameters from URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "default";
  const pageStr = searchParams.get("page") || "1";
  const page = parseInt(pageStr, 10) || 1;

  // Local state & mobile view state
  const [localSearch, setLocalSearch] = useState(search);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Keep local search sync'd with URL changes
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounce search update to URL parameters
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (localSearch !== search) {
        updateQuery({ search: localSearch, page: "1" });
      }
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [localSearch]);

  // URL state synchronization helper
  const updateQuery = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (
        val === null ||
        val === "" ||
        (key === "page" && val === "1") ||
        (key === "category" && val === "all") ||
        (key === "sort" && val === "default")
      ) {
        params.delete(key);
      } else {
        params.set(key, val);
      }
    });
    router.push(pathname + "?" + params.toString(), { scroll: false });
  };

  // Filter products list based on query parameters (no limit/slicing in utils)
  const filteredProducts = useMemo(() => {
    return filterProduct({
      products,
      search,
      category,
      sort: sortBy,
      limit: null,
    });
  }, [products, search, category, sortBy]);

  // Pagination Variables
  const itemsPerPage = 30;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const currentPage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  return (
    <>
      <Banner
        description={
          category === "all"
            ? "Browse through our curated collection of premium products across all categories. Find exactly what you need with our advanced filters and search."
            : `Explore our premium selection of ${category} products. Designed with quality and style in mind.`
        }
        title={category === "all" ? "Our Collections" : category}
        tag={category === "all" ? "" : category.replace("-", " ")}
        links={[{ href: "/products", name: "Products" }]}
      />
      {/* Grid Content Section */}
      <section
        className="wrapper mb-10 grid scroll-mt-24 grid-cols-1 gap-8 pt-10 lg:grid-cols-4"
        id="products-grid-section"
      >
        <Sidebar
          localSearch={localSearch}
          changeLocalSearch={setLocalSearch}
          updateQuery={updateQuery}
        />

        {/* Main Grid & Filters Content */}
        <main className="space-y-6 lg:col-span-3">
          {/* Catalog Top Toolbar */}
          <Toolbar
            clearLocalsearch={() => setLocalSearch("")}
            endIndex={endIndex}
            openMobileFilters={() => setMobileFiltersOpen(true)}
            startIndex={startIndex}
            totalItems={totalItems}
            updateQuery={updateQuery}
          />

          {/* Products Grid Content */}
          <ProductionSection
            currentPage={currentPage}
            emptyStateAction={() => {
              updateQuery({
                category: "all",
                search: "",
                sort: "default",
                page: "1",
              });
            }}
            paginatedProducts={paginatedProducts}
          />

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            handlePageChange={(newPage) => {
              updateQuery({ page: newPage.toString() });
              scrollToById("products-grid-section");
            }}
            totalPages={totalPages}
          />
        </main>
      </section>

      {/* Mobile Drawer (Responsive Filters Panel) */}
      <MobileDrawer
        changeLocalSearch={(str) => setLocalSearch(str)}
        mobileFiltersOpen={mobileFiltersOpen}
        localSearch={localSearch}
        updateQuery={updateQuery}
        closeMobileFilters={() => setMobileFiltersOpen(false)}
      />
    </>
  );
}
