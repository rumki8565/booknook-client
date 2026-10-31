import type { Metadata } from "next";
import { Suspense } from "react";
import type { JSX } from "react";
import LoginForm from "@/components/auth/LoginForm";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage(): JSX.Element {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
