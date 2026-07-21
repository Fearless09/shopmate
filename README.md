# ShopMate — Premium E-Commerce Experience

ShopMate is a modern, high-performance, and visually stunning e-commerce web application. Built using Next.js 16, React 19, and Tailwind CSS v4, it showcases a sleek shopping interface featuring smooth micro-animations, real-time product filters, persistent shopping carts, and dynamic routing.

---

## 🌟 Overview for Everyone (Non-Technical)

### What is ShopMate?
ShopMate is a complete digital storefront simulation designed to provide users with an immersive, fluid, and delightful online shopping experience. From the moment you land on the page, you are greeted with smooth carousels, clean product listings, and a responsive interface that works perfectly on phones, tablets, and desktops.

### Key Highlights
*   **Buttery-Smooth Animations:** Interactive elements respond instantly with premium micro-animations (sliding menus, fading lists, and hover effects).
*   **Smart Product Catalog:** Search for products instantly, filter by category, or sort by price and rating to find exactly what you need.
*   **Wishlist & Cart:** Save items for later using the Wishlist feature or add them directly to the Cart. Your selections are remembered even if you close the browser.
*   **Full Checkout Flow:** A complete simulated checkout experience, guiding you through cart reviews, shipping forms, and order confirmations.
*   **Dark and Light Modes:** Transition seamlessly between beautiful, custom-tailored dark and light mode layouts that are gentle on the eyes.

---

## 🛠️ Technical Architecture & Stack

ShopMate is built on a highly optimized, modern React stack designed for maximum responsiveness, clean state management, and SEO-friendly routing.

### Tech Stack Breakdown
*   **Framework:** **Next.js 16.2.10** (utilizing the App Router for server-rendered components, dynamic layouts, and static generation).
*   **Core Library:** **React 19.2.4** with the **React Compiler** (`babel-plugin-react-compiler`) enabled for automatic dependency tracking and optimized re-renders.
*   **Styling:** **Tailwind CSS v4** + PostCSS for utility-first styling, using modern HSL-tailored colors, smooth dark mode integration, and fluid transitions.
*   **State Management:** React Context API (`ShopContext`) utilizing the `useReducer` hook to handle a clean unidirectional state flow for products, wishlist entries, cart computations, category listings, and global loading states.
*   **Animation Suite:** **GSAP 3.15.0** (GreenSock Animation Platform) and `@gsap/react` for complex scroll-driven, timeline-based, and staggered layout transitions, along with **Lottie** animations (`@lottiefiles/dotlottie-react`).
*   **Data Fetching:** Native Fetch API wrapped with a React-cached `fetcher` calling `https://dummyjson.com` for dynamic mock product data.
*   **Database Simulation & Persistence:** LocalStorage cache synchronization to persist user cart and wishlist states across browsing sessions.
*   **Type Safety:** **TypeScript 5** ensuring end-to-end type safety for products, checkout summaries, and cart transactions.

---

## ⚙️ Core Features

| Feature | For Users (Non-Technical) | For Developers (Technical) |
| :--- | :--- | :--- |
| **Interactive Catalog** | Search products by name, filter by categories, and sort by ratings or prices. | URL query sync via Next.js `useSearchParams` for shareable state. Debounced search inputs to prevent API call storms. |
| **Global Wishlist & Cart** | Save favorites and manage quantities in a centralized cart that persists between visits. | Global state managed by `ShopContext` dispatch actions. Auto-recomputes totals, quantities, and discounts on state change. Syncs with LocalStorage. |
| **Product Detail Pages** | View interactive high-res image galleries, read ratings, read detailed warranty info, and see similar items. | Dynamically generated sub-pages utilizing Next.js `generateMetadata` for SEO, OpenGraph tags, and Twitter card previews. |
| **Simulated Checkout** | Review your final items, fill in shipping details, and receive an instant order validation code. | Checkout step validation that triggers GSAP timelines for success screens and empties the cart upon confirmation. |
| **Fluid Dark Mode** | Switch color schemes seamlessly without flickering. | Integrated using `next-themes` styling variants coupled with Tailwind CSS dark selectors. |

---

## 📂 Project Directory Structure

```markdown
shopmate/
├── public/                # Static assets, logos, and media files
├── src/
│   ├── app/               # Next.js App Router Page layouts and paths
│   │   ├── checkout/      # /checkout page and checkout success views
│   │   ├── products/      # /products catalog index and /products/[slug] dynamic detail pages
│   │   ├── globals.css    # Main stylesheet utilizing Tailwind CSS directives
│   │   ├── layout.tsx     # Base layout wrapping app with providers (ShopProvider, ThemeProvider)
│   │   └── manifest.ts    # Web App Manifest definition for PWA capabilities
│   ├── components/        # UI components grouped by feature area
│   │   ├── checkout/      # Cart items lists, shipping forms, and success modals
│   │   ├── product-details/# Product page components (breadcrumbs, galleries, reviews tabs)
│   │   ├── product-page/  # Catalog components (filter sidebars, paginators, search toolbars)
│   │   ├── shared/        # Reusable structures (Navbar, Footer, Hero carousel, Product cards)
│   │   └── ui/            # Primitive micro-components (Dropdowns, toggles, skeleton screens)
│   ├── context/           # React Context state layers (ShopContext, ThemeProvider)
│   ├── data/              # Static data definitions (slides, features list, statistics)
│   ├── hooks/             # Custom utility hooks (outside clicks, scroll hooks, clipboard utilities)
│   ├── lib/               # Utility functions (GSAP configurations, mathematical helper functions)
│   └── type/              # TypeScript global interface definitions (.d.ts declarations)
```

---

## 🚀 Getting Started (Run Locally)

Follow these steps to run the development server on your machine.

### 1. Prerequisites
Ensure you have Node.js installed (v18+ recommended).

### 2. Install Dependencies
You can use `pnpm`, `npm`, `yarn`, or `bun`:
```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

### 3. Run the Development Server
Start the dev server locally:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To build the application for production deployment:
```bash
pnpm build
pnpm start
# or
npm run build
npm run start
```
