import type { JSX, ReactNode } from "react";
import PrivateRoute from "@/components/PrivateRoute";

export default function PrivateLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <PrivateRoute>{children}</PrivateRoute>;
}
