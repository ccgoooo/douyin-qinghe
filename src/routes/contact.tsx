import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageHead } from "@/components/Layout";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Send Qinghe Studio a message about orders, custom gifts or workshops."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(1000),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  return (
    <>
      <PageHead eyebrow="Say hello" title="Contact us" sub="Demo form — messages are not sent or stored anywhere." />
      <section className="mx-auto max-w-xl px-4 pb-20">
        {sent ? (
          <div role="status" className="rounded-xl border bg-card p-8 text-center">
            <h2 className="text-3xl">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">Your message was received. We'll reply within two working days.</p>
            <button className="btn-outline mt-6" onClick={() => setSent(false)}>Send another</button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
            if (!r.success) return setErr(r.error.issues[0].message);
            setErr(""); setSent(true);
          }}>
            <label className="block text-sm">Name<input name="name" className="field mt-1" maxLength={100} /></label>
            <label className="block text-sm">Email<input name="email" type="email" className="field mt-1" maxLength={255} /></label>
            <label className="block text-sm">Message<textarea name="message" rows={5} className="field mt-1" maxLength={1000} /></label>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button className="btn w-full">Send message</button>
          </form>
        )}
      </section>
    </>
  );
}
