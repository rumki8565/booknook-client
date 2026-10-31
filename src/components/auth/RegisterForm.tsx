"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { validatePassword } from "@/lib/validation";
import AuthCard from "./AuthCard";
import GoogleButton from "./GoogleButton";
import PasswordInput from "./PasswordInput";

export default function RegisterForm(): JSX.Element {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const handlePasswordChange = (value: string): void => {
    setPassword(value);
    if (passwordError) {
      setPasswordError(validatePassword(value) ?? "");
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const validationError: string | null = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      toast.error(validationError);
      return;
    }
    setPasswordError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
        image: photoUrl.trim(),
      });

      if (error) {
        toast.error(error.message ?? "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created! Please log in.");
      router.push("/login");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Register"
      subtitle="Create your BookNook account in a minute."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setName(event.target.value)
            }
            required
            autoComplete="name"
            placeholder="Your full name"
            className="input w-full"
          />
        </div>

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
          <label htmlFor="photo" className="text-sm font-medium">
            Photo URL
          </label>
          <input
            id="photo"
            type="url"
            value={photoUrl}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setPhotoUrl(event.target.value)
            }
            required
            placeholder="https://example.com/your-photo.jpg"
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
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          {passwordError ? (
            <p role="alert" className="text-sm text-error">
              {passwordError}
            </p>
          ) : (
            <p className="text-xs text-base-content/60">
              At least 6 characters, with an uppercase and a lowercase letter.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="divider text-xs">OR</div>

      <GoogleButton callbackURL="/" />

      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="link link-primary font-medium">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
