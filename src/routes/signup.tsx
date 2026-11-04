import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/signup")({
  head: () => seo("Become a member", "Join Qinghe Studio for member pricing and early access."),
  component: () => <AuthForm mode="signup" />,
});
