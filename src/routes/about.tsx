import { createFileRoute } from "@tanstack/react-router";
import { faqs, team } from "@/lib/data";
import { PageHead } from "@/components/Layout";
import { seo } from "@/lib/seo";
import soap from "@/assets/p-soap.jpg";

export const Route = createFileRoute("/about")({
  head: () => seo("About & FAQ", "The story of Qinghe Studio, the people behind it, and answers to common questions."),
  component: About,
});

function About() {
  return (
    <>
      <PageHead eyebrow="Our story" title="Made slowly, by hand." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 md:grid-cols-2">
        <div className="space-y-4 text-muted-foreground">
          <p>Qinghe Studio began at a kitchen table, with one pot of soy wax and a jar of dried lavender. Friends asked for one candle, then another — and soon the kitchen became a small shop on a quiet street.</p>
          <p>Today we still pour every candle by hand, mix oils in small batches and wrap each order ourselves. We serve our neighbors through in-store pickup and local delivery.</p>
        </div>
        <img src={soap} alt="Handmade soaps" loading="lazy" width={816} height={816} className="aspect-[4/3] w-full rounded-2xl object-cover" />
      </section>
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-4xl">The team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {team.map((t) => (
              <div key={t.name} className="rounded-xl bg-card p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary font-display text-3xl text-primary-foreground">{t.name[0]}</div>
                <h3 className="mt-4 text-2xl">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-4xl">FAQ</h2>
        <div className="mt-6 divide-y border-y">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-semibold">{f.q}<span className="float-right group-open:rotate-45 transition">+</span></summary>
              <p className="mt-2 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
