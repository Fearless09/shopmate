import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://shopmate.vercel.app";

const SITE_NAME = "Shopmate";
const TITLE = "Shopmate | Modern E-commerce Landing Page";
const DESCRIPTION =
  "Discover thousands of products across beauty, electronics, fashion, and more. Shop smarter with Shopmate — fast, modern, and built for you.";
const KEYWORDS = [
  "shopmate",
  "e-commerce",
  "online shopping",
  "buy online",
  "beauty products",
  "electronics",
  "fashion",
  "modern store",
  "best deals",
  "free shipping",
  "discounts",
  "product catalog",
];

// ---- Global Metadata ----
export const metadata: Metadata = {
  // ---- Core ----
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: "Next.js",

  // ---- Canonical ----
  alternates: {
    canonical: "/",
  },

  // ---- Open Graph ----
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // 1200x630 recommended
        width: 1200,
        height: 630,
        alt: "Shopmate — Modern E-commerce Landing Page",
        type: "image/png",
      },
    ],
  },

  // ---- Twitter / X ----
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    // creator: "@shopmate", // uncomment if you have a Twitter handle
    images: [
      {
        url: "/og-image.png",
        alt: "Shopmate — Modern E-commerce Landing Page",
      },
    ],
  },

  // ---- Robots ----
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // ---- App / PWA ----
  applicationName: SITE_NAME,
  category: "shopping",
  manifest: "/manifest.json", // if you have a PWA manifest
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },

  // ---- Icons ----
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  // ---- Verification (fill in when you have these) ----
  verification: {
    // google: "your-google-search-console-token",
    // yandex: "your-yandex-token",
  },

  // ---- Other ----
  other: {
    "msapplication-TileColor": "#6366f1", // indigo-500 — matches your accent
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }, // neutral-950
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} scrollbar-thin scrollbar-thumb-indigo-500/70 ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-screen flex-col bg-white dark:bg-neutral-950">
        <ThemeProvider
          disableTransitionOnChange
          defaultTheme="system"
          attribute={"data-theme"}
          enableSystem
        >
          <ShopProvider>
            <Navbar />
            <section className="flex-1">{children}</section>
            <Footer />
          </ShopProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
