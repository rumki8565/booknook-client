"use client";

import Link from "next/link";
import type { JSX } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps): JSX.Element {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="section-title">Something went wrong</h1>
      <p className="mt-3 text-base-content/70">
        We could not load this page. Please try again in a moment.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn btn-primary btn-outline">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
