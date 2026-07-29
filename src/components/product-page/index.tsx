"use client";

import { useShop } from "@/context/ShopContext";
import { filterProduct } from "@/lib/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import { scrollToById } from "@/lib/utils";
import Toolbar from "./Toolbar";
import ProductionSection from "./ProductSection";
import Pagination from "./Pagination";
import MobileDrawer from "./MobileDrawer";
import Banner from "../shared/Banner";
import { useUpdateUrlQuery } from "@/hooks/useUpdateUrlQuery";

export default function ProductsCatalog() {
  const { products } = useShop();
  const searchParams = useSearchParams();
  const { updateUrlQuery } = useUpdateUrlQuery();

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
        updateUrlQuery({ search: localSearch, page: "1" });
      }
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [localSearch]);

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
        <Sidebar localSearch={localSearch} changeLocalSearch={setLocalSearch} />

        {/* Main Grid & Filters Content */}
        <main className="space-y-6 lg:col-span-3">
          {/* Catalog Top Toolbar */}
          <Toolbar
            clearLocalsearch={() => setLocalSearch("")}
            endIndex={endIndex}
            openMobileFilters={() => setMobileFiltersOpen(true)}
            startIndex={startIndex}
            totalItems={totalItems}
          />

          {/* Products Grid Content */}
          <ProductionSection
            currentPage={currentPage}
            paginatedProducts={paginatedProducts}
          />

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            handlePageChange={() => scrollToById("products-grid-section")}
            totalPages={totalPages}
          />
        </main>
      </section>

      {/* Mobile Drawer (Responsive Filters Panel) */}
      <MobileDrawer
        changeLocalSearch={(str) => setLocalSearch(str)}
        mobileFiltersOpen={mobileFiltersOpen}
        localSearch={localSearch}
        closeMobileFilters={() => setMobileFiltersOpen(false)}
      />
    </>
  );
}
