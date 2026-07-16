import ProductDetailClient from "@/components/product-details";
import { fetcher } from "@/lib/fetcher";
import { calcTotal } from "@/lib/utils";
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

    const title = `${product.title} | Shopmate`;
    const { discountedTotal } = calcTotal({
      discountPercentage: product.discountPercentage,
      price: product.price,
      quantity: 1,
    });

    const rawDescription = `${product.description} — ${
      product.discountPercentage > 0
        ? `${product.discountPercentage}% off, now $${discountedTotal}`
        : `$${discountedTotal}`
    }. ${product.shippingInformation}.`;

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
      title: { absolute: title },
      description,
      keywords,
      alternates: {
        canonical: `/product/${product.id}`,
      },
      openGraph: {
        title,
        description,
        url: `/product/${product.id}`,
        siteName: "Shopmate",
        type: "website",
        images: ogImages,
        locale: "en_US",
      },
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
      other: {
        "product:price:amount": discountedTotal,
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
