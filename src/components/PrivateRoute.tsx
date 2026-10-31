"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import type { JSX, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname: string = usePathname();

  useEffect((): void => {
    // Wait until the session is loaded, so a reload never sends a logged in user to Login
    if (!isPending && !session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, pathname, router]);

  if (isPending || !session) {
    return <Spinner />;
  }

  return <>{children}</>;
}
