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

export const metadata: Metadata = {
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Shopmate — Modern E-commerce Landing Page",
      type: "image/png",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: {
      url: "/og-image.png",
      alt: "Shopmate — Modern E-commerce Landing Page",
    },
  },
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
  applicationName: SITE_NAME,
  category: "shopping",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
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
