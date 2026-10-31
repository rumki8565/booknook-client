import type { Metadata } from "next";
import type { JSX } from "react";
import BookCard from "@/components/BookCard";
import SectionHeading from "@/components/SectionHeading";
import { getBooks } from "@/lib/api";
import type { Book } from "@/types/book";

export const metadata: Metadata = {
  title: "All Books",
};

export default async function AllBooksPage(): Promise<JSX.Element> {
  let books: Book[] = [];
  let hasError: boolean = false;

  try {
    books = await getBooks();
  } catch {
    hasError = true;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        title="All Books"
        subtitle="Browse every book in the library and pick your next read."
      />

      {hasError ? (
        <p className="text-center text-error">
          We could not load the books right now. Please try again in a moment.
        </p>
      ) : books.length === 0 ? (
        <p className="text-center text-base-content/70">
          No books have been added yet. Check back soon.
        </p>
      ) : (
        <>
          <p className="mb-6 text-sm text-base-content/70">
            Showing {books.length} {books.length === 1 ? "book" : "books"}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map(
              (book: Book): JSX.Element => (
                <BookCard key={book._id} book={book} />
              ),
            )}
          </div>
        </>
      )}
    </section>
  );
}
