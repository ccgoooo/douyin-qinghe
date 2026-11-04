import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { fmt } from "@/lib/data";
import { useStore } from "@/lib/store";
import { PageHead } from "@/components/Layout";
import { seo } from "@/lib/seo";
import { useCartLines } from "./cart";

export const Route = createFileRoute("/checkout")({
  head: () => seo("Checkout", "Demo checkout for Qinghe Studio — no real payment is taken."),
  component: Checkout,
});

function Checkout() {
  const { clear } = useStore();
  const { lines, subtotal, discount } = useCartLines();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [order, setOrder] = useState<string | null>(null);
  const fee = method === "delivery" ? 15 : 0;

  if (order) return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="eyebrow">Demo order placed</p>
      <h1 className="mt-2 text-5xl">Thank you!</h1>
      <p className="mt-3 text-muted-foreground">Order <b>{order}</b> is a placeholder — no payment was taken and nothing was sent.</p>
      <Link to="/products" className="btn mt-6">Keep shopping</Link>
    </section>
  );

  if (!lines.length) return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-muted-foreground">Your cart is empty.</p>
      <Link to="/products" className="btn mt-4">Browse products</Link>
    </section>
  );

  return (
    <>
      <PageHead eyebrow="Checkout" title="Almost there" sub="Demo only. Please use fictional details — no payment is processed." />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 pb-20 md:grid-cols-[1fr_320px]">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); clear(); setOrder("QH-" + Math.floor(100000 + Math.random() * 900000)); }}>
          <fieldset className="grid grid-cols-2 gap-3">
            {(["pickup", "delivery"] as const).map((m) => (
              <label key={m} className={`cursor-pointer rounded-xl border p-4 ${method === m ? "border-primary bg-card" : ""}`}>
                <input type="radio" name="method" className="sr-only" checked={method === m} onChange={() => setMethod(m)} />
                <p className="font-semibold">{m === "pickup" ? "In-store pickup" : "Local delivery"}</p>
                <p className="text-sm text-muted-foreground">{m === "pickup" ? "Free" : fmt(15)}</p>
              </label>
            ))}
          </fieldset>
          <label className="block text-sm">Name (fictional)<input required className="field mt-1" placeholder="Test Customer" /></label>
          {method === "delivery" && <label className="block text-sm">Delivery note (fictional)<input required className="field mt-1" placeholder="Sample address" /></label>}
          <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            Payment placeholder — no card fields, no payment provider connected.
          </div>
          <button className="btn w-full">Place demo order · {fmt(subtotal - discount + fee)}</button>
        </form>
        <aside className="h-fit rounded-xl border bg-card p-5 text-sm">
          <h2 className="text-2xl">Summary</h2>
          <ul className="mt-3 space-y-2">{lines.map((l) => <li key={l.id} className="flex justify-between"><span>{l.p.name} × {l.qty}</span><span>{fmt(l.p.price * l.qty)}</span></li>)}</ul>
          <div className="mt-4 space-y-1 border-t pt-3">
            <p className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></p>
            {discount > 0 && <p className="flex justify-between text-primary"><span>Member −10%</span><span>−{fmt(discount)}</span></p>}
            <p className="flex justify-between"><span>Delivery</span><span>{fmt(fee)}</span></p>
            <p className="flex justify-between text-base font-semibold"><span>Total</span><span>{fmt(subtotal - discount + fee)}</span></p>
          </div>
        </aside>
      </section>
    </>
  );
}
