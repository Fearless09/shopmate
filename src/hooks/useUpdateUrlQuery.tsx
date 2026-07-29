"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Update = {
  page?: string | null;
  category?: string | null;
  sort?: string | null;
  search?: string | null;
  [key: string]: string | null | undefined;
};

export const useUpdateUrlQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state synchronization helper
  const updateUrlQuery = (updates: Update) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, val]) => {
      if (
        val === null ||
        val === undefined ||
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
  return { updateUrlQuery };
};
