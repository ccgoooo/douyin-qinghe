import { createFileRoute, Link } from "@tanstack/react-router";
import { fmt, products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { PageHead } from "@/components/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () => seo("Your cart", "Review the items in your Qinghe Studio cart."),
  component: Cart,
});

export function useCartLines() {
  const { cart, member } = useStore();
  const lines = cart.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! })).filter((l) => l.p);
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
  const discount = member ? Math.round(subtotal * 0.1) : 0;
  return { lines, subtotal, discount };
}

function Cart() {
  const { setQty } = useStore();
  const { lines, subtotal, discount } = useCartLines();
  return (
    <>
      <PageHead eyebrow="Cart" title="Your cart" />
      <section className="mx-auto max-w-4xl px-4 pb-20">
        {lines.length === 0 ? (
          <div className="rounded-xl border bg-card p-10 text-center">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/products" className="btn mt-4">Browse products</Link>
          </div>
        ) : (
          <>
            <ul className="divide-y rounded-xl border bg-card">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-4 p-4">
                  <img src={l.p.image} alt="" width={64} height={64} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex-1"><p className="font-semibold">{l.p.name}</p><p className="text-sm text-muted-foreground">{fmt(l.p.price)}</p></div>
                  <div className="flex items-center gap-2">
                    <button aria-label="Decrease" className="h-8 w-8 rounded-full border" onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                    <span className="w-6 text-center">{l.qty}</span>
                    <button aria-label="Increase" className="h-8 w-8 rounded-full border" onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1 text-right">
              <p>Subtotal: {fmt(subtotal)}</p>
              {discount > 0 && <p className="text-primary">Member discount: −{fmt(discount)}</p>}
              <p className="text-xl font-semibold">Total: {fmt(subtotal - discount)}</p>
              <Link to="/checkout" className="btn mt-4">Checkout</Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}
