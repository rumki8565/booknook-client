import Link from "next/link";
import type { JSX } from "react";

export default function NotFound(): JSX.Element {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <title>BookNook | Page Not Found</title>
      <p className="font-heading text-7xl font-bold text-primary">404</p>
      <h1 className="section-title mt-4">This page is not on our shelf</h1>
      <p className="mt-3 text-base-content/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
