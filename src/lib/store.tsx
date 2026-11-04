import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * DEMO-ONLY client state. Cart and "member accounts" live in localStorage.
 * No password is stored — only a display name/email — and nothing is sent anywhere.
 */
export type CartItem = { id: string; qty: number };
export type Member = { name: string; email: string };

type Store = {
  cart: CartItem[];
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  member: Member | null;
  signIn: (m: Member) => void;
  signOut: () => void;
  ready: boolean;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("qh-cart") || "[]"));
      setMember(JSON.parse(localStorage.getItem("qh-member") || "null"));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("qh-cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("qh-member", JSON.stringify(member)); }, [member, ready]);

  const value: Store = {
    cart, member, ready,
    add: (id) => setCart((c) => c.some((i) => i.id === id) ? c.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...c, { id, qty: 1 }]),
    setQty: (id, qty) => setCart((c) => qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => i.id === id ? { ...i, qty } : i)),
    clear: () => setCart([]),
    signIn: setMember,
    signOut: () => setMember(null),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore outside provider");
  return s;
}
