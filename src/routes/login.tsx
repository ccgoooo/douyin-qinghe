import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => seo("Sign in", "Sign in to your Qinghe Studio member account."),
  component: () => <AuthForm mode="login" />,
});
