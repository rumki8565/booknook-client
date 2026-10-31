"use client";

import type { JSX } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

interface GoogleButtonProps {
  callbackURL: string;
}

export default function GoogleButton({
  callbackURL,
}: GoogleButtonProps): JSX.Element {
  const handleClick = async (): Promise<void> => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
      if (error) {
        toast.error(error.message ?? "Google login failed. Please try again.");
      }
    } catch {
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn btn-outline w-full"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
}
