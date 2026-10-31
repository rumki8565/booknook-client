import type { Metadata } from "next";
import type { JSX } from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage(): JSX.Element {
  return <RegisterForm />;
}
