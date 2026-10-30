import type { JSX } from "react";

export default function HomePage(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="section-title">Welcome to BookNook</h1>
      <p className="mt-3 text-base-content/70">
        Add a book, borrow a book, return a book.
      </p>
    </section>
  );
}
