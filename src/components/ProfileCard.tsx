"use client";

import type { JSX } from "react";
import { authClient } from "@/lib/auth-client";

export default function ProfileCard(): JSX.Element | null {
  const { data: session } = authClient.useSession();

  if (!session) {
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className="mx-auto max-w-md rounded-box border border-base-300 bg-base-200/50 p-8 text-center shadow-sm">
      <div className="avatar">
        <div className="w-28 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} referrerPolicy="no-referrer" />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-primary">{name}</h2>
      <p className="mt-1 text-base-content/70">{email}</p>
    </div>
  );
}
