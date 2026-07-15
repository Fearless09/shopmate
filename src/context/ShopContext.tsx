"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { fetcher, getData, saveData } from "@/lib/fetcher";
import { calcTotal } from "@/lib/utils";

interface ShopContextType extends State {
  shopDispatcher: (acton: Action) => void;
}

interface State {
  products: Product[];
  cart: Cart | null;
  wishList: CartProduct[];
  categories: ProductCategory[];
  loading: boolean;
}

type Action =
  | {
      type: "init";
      payload: {
        products: Product[];
        cart: Cart | null;
        wishList: CartProduct[];
        categories: ProductCategory[];
      };
    }
  // Wish List
  | { type: "add-wishlist"; payload: CartProduct }
  | { type: "delete-wishlist"; payload: CartProduct["id"] }
  | { type: "clear-wishlist" }
  // Cart
  | { type: "add-cart"; payload: CartProduct }
  | { type: "delete-cart"; payload: CartProduct["id"] }
  | { type: "clear-cart" }
  | {
      type: "update-cart-quantity";
      payload: { id: CartProduct["id"]; quantity: number };
    }
  // Loading
  | { type: "toggle-loading"; payload?: boolean };

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const initialState: State = {
  products: [],
  cart: null,
  wishList: [],
  categories: [],
  loading: false,
};

const wishListKey = "WISH-LIST";
const cartKey = "CART-LIST";

export const ShopProvider = (props: PropsWithChildren) => {
  const [state, dispatcher] = useReducer(reducer, initialState);
  const shopDispatcher = (action: Action) => dispatcher(action);

  useEffect(() => {
    async function init() {
      try {
        shopDispatcher({ type: "toggle-loading", payload: true });

        const [products, categories, wishList, cart] = await Promise.all([
          fetcher<{ products: Product[] }>("products?limit=194").then(
            (res) => res.products,
          ),
          fetcher<ProductCategory[]>("products/categories"),
          getData<CartProduct[]>(wishListKey, []),
          getData<Cart | null>(cartKey, null),
        ]);

        shopDispatcher({
          type: "init",
          payload: { products, categories, cart, wishList },
        });
      } catch (error) {
        const msg =
          error instanceof Error
            ? `${error.message}: Unable to initialise Shop data`
            : "Unknown Error: Unable to initialise Shop data";
        throw Error(msg);
      } finally {
        shopDispatcher({ type: "toggle-loading", payload: false });
      }
    }

    init();
  }, []);

  return (
    <ShopContext.Provider value={{ ...state, shopDispatcher }} {...props} />
  );
};

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case "init": {
      const newCategories: ProductCategory[] = Array.from(
        new Map(
          [
            { name: "All", slug: "all", url: "all" },
            ...action.payload.categories,
          ].map((cat) => [cat.slug, cat]),
        ).values(),
      );

      return { ...state, ...action.payload, categories: newCategories };
    }

    case "add-wishlist": {
      const newWishList = Array.from(
        new Map(
          [action.payload, ...state.wishList].map((item) => [item.id, item]),
        ).values(),
      );

      saveData(wishListKey, newWishList);
      return { ...state, wishList: newWishList };
    }

    case "delete-wishlist": {
      const newWishList = state.wishList.filter(
        (item) => item.id !== action.payload,
      );

      saveData(wishListKey, newWishList);
      return { ...state, wishList: newWishList };
    }

    case "clear-wishlist": {
      saveData(wishListKey, []);
      return { ...state, wishList: [] };
    }

    case "add-cart": {
      const product: CartProduct[] = state.cart
        ? Array.from(
            new Map(
              [action.payload, ...state.cart.product].map((item) => [
                item.id,
                item,
              ]),
            ).values(),
          )
        : [action.payload];

      const totalProducts = product.length;
      const totalQuantity = product.reduce((acc, sum) => {
        return acc + sum.quantity;
      }, 0);

      const cart: Cart = state.cart
        ? { ...state.cart, product, totalProducts, totalQuantity }
        : {
            discountedTotal: 0,
            id: crypto.randomUUID(),
            product,
            total: 0,
            totalProducts,
            totalQuantity,
            userId: 1,
          };

      saveData(cartKey, cart);
      return { ...state, cart };
    }

    case "delete-cart": {
      if (!state.cart) return state;

      const newCartProduct: CartProduct[] = state.cart.product.filter(
        (item) => item.id !== action.payload,
      );
      const totalQuantity = newCartProduct.reduce((acc, sum) => {
        return acc + sum.quantity;
      }, 0);

      const cart: Cart = {
        ...state.cart,
        product: newCartProduct,
        totalProducts: newCartProduct.length,
        totalQuantity,
      };

      saveData(cartKey, cart);
      return { ...state, cart };
    }

    case "clear-cart": {
      saveData(cartKey, []);
      return { ...state, cart: null };
    }

    case "update-cart-quantity": {
      const { payload } = action;

      function updateCart(): Cart | null {
        if (!state.cart) return state.cart;

        const newCartProduct: CartProduct[] = state.cart.product.map((item) => {
          if (item.id === payload.id) {
            const quantity = Math.max(payload.quantity, 1);
            const { total, discountedTotal } = calcTotal({
              quantity,
              price: item.price,
              discountPercentage: item.discountPercentage,
            });

            return { ...item, quantity, total, discountedTotal };
          } else {
            return item;
          }
        });

        return { ...state.cart, product: newCartProduct };
      }

      saveData(cartKey, updateCart());
      return { ...state, cart: updateCart() };
    }

    case "toggle-loading": {
      return { ...state, loading: action.payload ?? !state.loading };
    }

    default: {
      return state;
    }
  }
};
