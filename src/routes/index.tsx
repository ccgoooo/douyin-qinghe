import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Handmade Aromatherapy & Home Goods", "Small-batch candles, diffusers and soaps made by hand. In-store pickup and local delivery."),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow">Handmade · Small batch · Local</p>
          <h1 className="mt-3 text-5xl leading-[1.05] md:text-7xl">Slow scents for <em className="text-primary">quiet</em> homes.</h1>
          <p className="mt-5 max-w-md text-muted-foreground">Qinghe Studio pours candles, blends oils and cuts soap by hand in our little neighborhood workshop.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn">Shop the collection</Link>
            <Link to="/signup" className="btn-outline">Become a member</Link>
          </div>
        </div>
        <img src={hero} alt="Handmade candles and oils on an oak table" width={1600} height={1008} className="aspect-[4/3] w-full rounded-2xl object-cover" />
      </section>

      <section className="border-y bg-secondary">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:grid-cols-3">
          {[["Free pickup", "Collect at the studio any day we're open"], ["Local delivery", "Within our delivery zone in 1–2 days"], ["Workshops", "Make your own candle with us"]].map(([t, d]) => (
            <div key={t}><h3 className="text-2xl">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div><p className="eyebrow">Featured</p><h2 className="mt-1 text-4xl">Studio favorites</h2></div>
          <Link to="/products" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground md:py-16">
          <h2 className="text-4xl">Members get 10% off every order</h2>
          <p className="mx-auto mt-2 max-w-md opacity-80">Plus early access to seasonal scents and workshop dates.</p>
          <Link to="/signup" className="btn-outline mt-6 border-primary-foreground text-primary-foreground">Join free</Link>
        </div>
      </section>
    </>
  );
}
