import { useState } from "react";
import { fmt, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useStore();
  const [added, setAdded] = useState(false);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border bg-card">
      <div className="aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{p.tag}</p>
        <h3 className="mt-1 text-2xl">{p.name}</h3>
        <p className="mt-1 flex-1 text-sm text-muted-foreground">{p.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold">{fmt(p.price)}</span>
          <button className="btn" onClick={() => { add(p.id); setAdded(true); setTimeout(() => setAdded(false), 1200); }}>
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
