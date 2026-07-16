export {};

declare global {
  interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
  }

  interface ProductReview {
    rating: number;
    comment: string;
    date: string; // ISO 8601 date string
    reviewerName: string;
    reviewerEmail: string;
  }

  interface ProductMeta {
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    barcode: string;
    qrCode: string;
  }

  type ProductAvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";

  interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku: string;
    weight: number;
    dimensions: ProductDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: ProductAvailabilityStatus;
    reviews: ProductReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: ProductMeta;
    images: string[];
    thumbnail: string;
  }

  interface ProductCategory {
    slug: string;
    name: string;
    url: string;
  }
}
