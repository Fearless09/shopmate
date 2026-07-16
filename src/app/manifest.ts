import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shopmate | Modern E-commerce Landing Page",
    short_name: "Shopmate",
    description:
      "Discover thousands of products across beauty, electronics, fashion, and more. Shop smarter with Shopmate — fast, modern, and built for you.",
    start_url: "/",
    display: "standalone",
    theme_color: "#6366f1",
    categories: ["shopping", "ecommerce"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
