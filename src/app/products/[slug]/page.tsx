import ProductDetailClient from "@/components/product-details";
import { fetcher } from "@/lib/fetcher";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: ProductDetailsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const productId = parseInt(slug, 10);

    const product = await fetcher<Product>(`/products/${productId}`);
    const previousImages = (await parent).openGraph?.images || [];

    // ---- Derived values ----
    const discountedPrice = (
      product.price *
      (1 - product.discountPercentage / 100)
    ).toFixed(2);

    const hasDiscount = product.discountPercentage > 0;
    const inStock = product.availabilityStatus === "In Stock";

    const title = `${product.title} | Shopmate`;

    // Keep description tight and informative for SEO (aim under 160 chars)
    const rawDescription = `${product.description} — ${hasDiscount ? `${product.discountPercentage}% off, now $${discountedPrice}` : `$${discountedPrice}`}. ${product.shippingInformation}.`;
    const description =
      rawDescription.length > 160
        ? rawDescription.slice(0, 157).trimEnd() + "..."
        : rawDescription;

    const keywords = [
      product.title,
      product.category,
      ...(product.brand ? [product.brand] : []),
      ...product.tags,
      "buy online",
      "free shipping",
      "shopmate",
      "e-commerce",
    ];

    const ogImages = [
      {
        url: product.thumbnail,
        width: 800,
        height: 800,
        alt: `${product.title} — thumbnail`,
      },
      ...product.images.map((img, i) => ({
        url: img,
        width: 800,
        height: 800,
        alt: `${product.title} — image ${i + 1}`,
      })),
      ...previousImages,
    ];

    return {
      // ---- Core ----
      title: {
        absolute: title, // bypass root layout template so it doesn't double up
      },
      description,
      keywords,

      // ---- Canonical ----
      alternates: {
        canonical: `/product/${product.id}`,
      },

      // ---- Open Graph (Facebook, LinkedIn, WhatsApp, etc.) ----
      openGraph: {
        title,
        description,
        url: `/product/${product.id}`,
        siteName: "Shopmate",
        type: "website",
        images: ogImages,
        locale: "en_US",
      },

      // ---- Twitter / X Card ----
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          {
            url: product.thumbnail,
            alt: product.title,
          },
        ],
      },

      // ---- Robots ----
      robots: {
        index: inStock, // don't index out-of-stock pages — avoids wasting crawl budget
        follow: true,
        googleBot: {
          index: inStock,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },

      // ---- Extra product-specific meta via `other` ----
      other: {
        // Open Graph product namespace — not natively supported by Next.js
        // Metadata API but injected as raw meta tags via `other`
        "product:price:amount": discountedPrice,
        "product:price:currency": "USD",
        "product:availability": product.availabilityStatus,
        "product:condition": "new",
        "product:brand": product.brand ?? "",
        "product:retailer_item_id": String(product.id),
        "product:sku": product.sku,
        "product:category": product.category,
      },
    };
  } catch (error) {
    return notFound();
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const productId = parseInt(slug, 10);

  return <ProductDetailClient productId={productId} />;
}
