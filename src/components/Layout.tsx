import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const { cart, member } = useStore();
  const [open, setOpen] = useState(false);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-primary py-2 text-center text-xs text-primary-foreground">
        Demo site · Free in-store pickup · Local delivery 1–2 days
      </div>
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-2xl">Qinghe <span className="italic text-accent">Studio</span></Link>
          <nav className="hidden gap-8 text-sm md:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} activeProps={{ className: "text-primary font-semibold" }} className="hover:text-primary">{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 text-sm">
            <Link to={member ? "/account" : "/login"} className="hidden hover:text-primary sm:block">{member ? "My account" : "Sign in"}</Link>
            <Link to="/cart" className="rounded-full border px-3 py-1.5 hover:border-primary">Cart ({count})</Link>
            <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-3 border-t px-4 py-4 md:hidden">
            {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>)}
            <Link to={member ? "/account" : "/login"} onClick={() => setOpen(false)}>{member ? "My account" : "Sign in"}</Link>
          </nav>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm sm:grid-cols-3">
          <div>
            <p className="font-display text-xl">Qinghe Studio</p>
            <p className="mt-2 text-muted-foreground">Handmade aromatherapy & home goods. A fictional business for demonstration.</p>
          </div>
          <div className="text-muted-foreground">
            <p>Studio: 1 Example Lane, Sample District (fictional)</p>
            <p>Phone: 000-0000-0000 (placeholder)</p>
            <p>Open Tue–Sun, 10:00–19:00</p>
          </div>
          <div className="flex flex-col gap-1">
            <Link to="/products">Shop</Link><Link to="/about">About & FAQ</Link><Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-6 pt-12 md:pt-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-4xl md:text-6xl">{title}</h1>
      {sub && <p className="mt-3 max-w-xl text-muted-foreground">{sub}</p>}
    </section>
  );
}
