import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";

type Mode = "login" | "signup" | "forgot";

/** DEMO auth: passwords are never stored or transmitted. Any input "works". */
export function AuthForm({ mode }: { mode: Mode }) {
  const { signIn } = useStore();
  const nav = useNavigate();
  const [done, setDone] = useState(false);
  const title = { login: "Welcome back", signup: "Join the studio", forgot: "Reset password" }[mode];

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <p className="eyebrow">Member area</p>
      <h1 className="mt-2 text-5xl">{title}</h1>
      <p className="mt-2 rounded-md bg-secondary p-3 text-xs text-muted-foreground">Demo only: use a fake email and password. Nothing is stored or sent.</p>
      {done ? (
        <div role="status" className="mt-6 rounded-xl border bg-card p-6">
          <p>If an account exists, a reset link would be sent (placeholder — no email is sent).</p>
          <Link to="/login" className="btn mt-4">Back to sign in</Link>
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const email = String(f.get("email") || "").trim();
          if (mode === "forgot") return setDone(true);
          signIn({ email, name: String(f.get("name") || email.split("@")[0]) });
          nav({ to: "/account" });
        }}>
          {mode === "signup" && <label className="block text-sm">Name<input name="name" required maxLength={60} className="field mt-1" /></label>}
          <label className="block text-sm">Email<input name="email" type="email" required maxLength={255} className="field mt-1" placeholder="you@example.test" /></label>
          {mode !== "forgot" && <label className="block text-sm">Password<input type="password" required minLength={6} autoComplete="off" className="field mt-1" /></label>}
          <button className="btn w-full">{mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}</button>
        </form>
      )}
      <div className="mt-6 flex justify-between text-sm">
        {mode !== "login" && <Link to="/login" className="underline">Sign in</Link>}
        {mode !== "signup" && <Link to="/signup" className="underline">Create account</Link>}
        {mode === "login" && <Link to="/forgot-password" className="underline">Forgot password?</Link>}
      </div>
    </section>
  );
}
