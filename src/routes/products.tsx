import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { PageHead } from "@/components/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () => seo("Shop", "Candles, reed diffusers, soaps, oil blends, gift sets and candle-making workshops."),
  component: () => (
    <>
      <PageHead eyebrow="The collection" title="Shop" sub="Everything is made in small batches. Prices are fictional." />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </section>
    </>
  ),
});
