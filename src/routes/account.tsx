import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/account")({
  head: () => seo("Member area", "Your Qinghe Studio member benefits."),
  component: Account,
});

function Account() {
  const { member, ready, signOut } = useStore();
  const nav = useNavigate();
  useEffect(() => { if (ready && !member) nav({ to: "/login", replace: true }); }, [ready, member, nav]);
  if (!member) return <p className="p-16 text-center text-muted-foreground">Loading…</p>;

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow">Members only</p>
      <h1 className="mt-2 text-5xl">Hello, {member.name}</h1>
      <p className="mt-1 text-muted-foreground">{member.email}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[["10% off", "Applied automatically at checkout"], ["Early access", "Autumn scent drop: coming soon"], ["Workshop priority", "Book classes before the public"]].map(([t, d]) => (
          <div key={t} className="rounded-xl border bg-card p-6"><h2 className="text-3xl">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border bg-secondary p-6">
        <h2 className="text-2xl">Member code</h2>
        <p className="mt-1 font-mono text-lg tracking-widest">QH-MEMBER-DEMO</p>
      </div>
      <div className="mt-8 flex gap-3">
        <Link to="/products" className="btn">Shop with discount</Link>
        <button className="btn-outline" onClick={() => { signOut(); nav({ to: "/", replace: true }); }}>Sign out</button>
      </div>
    </section>
  );
}
