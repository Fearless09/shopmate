import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Shopmate | Modern E-commerce Landing Page",
  description:
    "A polished, responsive e-commerce landing page built with Next.js, Tailwind CSS, and GSAP.",
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
