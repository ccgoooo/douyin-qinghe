import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/forgot-password")({
  head: () => seo("Forgot password", "Reset your Qinghe Studio member password."),
  component: () => <AuthForm mode="forgot" />,
});
