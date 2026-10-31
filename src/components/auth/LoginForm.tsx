"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getSafeRedirect } from "@/lib/redirect";
import AuthCard from "./AuthCard";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo: string = getSafeRedirect(searchParams.get("redirect"));

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setFormError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        const message: string =
          error.message ?? "Login failed. Please try again.";
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("Welcome back to BookNook!");
      router.push(redirectTo);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Login"
      subtitle="Welcome back. Log in to borrow and share books."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            {formError}
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setEmail(event.target.value)
            }
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={(): void => {
              toast("Password reset is not available yet.");
            }}
            className="link link-primary text-sm"
          >
            Forget Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="divider text-xs">OR</div>

      <GoogleButton callbackURL={redirectTo} />

      <p className="mt-6 text-center text-sm">
        New to BookNook?{" "}
        <Link href="/register" className="link link-primary font-medium">
          Register
        </Link>
      </p>
    </AuthCard>
  );
}
