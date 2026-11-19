"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type CartItem = { id: string; qty: number };
type Store = {
  ready: boolean;
  cart: CartItem[];
  wishlist: string[];
  cartCount: number;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
};

const Ctx = createContext<Store | null>(null);
const CART_KEY = "mkv-cart-v1";
const WISH_KEY = "mkv-wishlist-v1";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setCart(read<CartItem[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setReady(true);
  }, []);
  useEffect(() => { if (ready) write(CART_KEY, cart); }, [cart, ready]);
  useEffect(() => { if (ready) write(WISH_KEY, wishlist); }, [wishlist, ready]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((c) => {
      const f = c.find((i) => i.id === id);
      return f ? c.map((i) => (i.id === id ? { ...i, qty: Math.min(99, i.qty + qty) } : i)) : [...c, { id, qty }];
    });
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty: Math.min(99, qty) } : i))));
  }, []);
  const removeFromCart = useCallback((id: string) => setCart((c) => c.filter((i) => i.id !== id)), []);
  const clearCart = useCallback(() => setCart([]), []);
  const toggleWishlist = useCallback((id: string) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
  }, []);

  const value = useMemo<Store>(() => ({
    ready, cart, wishlist,
    cartCount: cart.reduce((n, i) => n + i.qty, 0),
    addToCart, setQty, removeFromCart, clearCart, toggleWishlist,
    inWishlist: (id) => wishlist.includes(id),
  }), [ready, cart, wishlist, addToCart, setQty, removeFromCart, clearCart, toggleWishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside <StoreProvider>");
  return v;
}
