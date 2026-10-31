import Link from "next/link";
import type { JSX } from "react";
import type { Book } from "@/types/book";
import BookCard from "../BookCard";
import SectionHeading from "../SectionHeading";

interface NewArrivalsProps {
  books: Book[];
  hasError: boolean;
}

export default function NewArrivals({
  books,
  hasError,
}: NewArrivalsProps): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        title="New Arrivals"
        subtitle="The latest books our readers have added to the library."
      />

      {hasError ? (
        <p className="text-center text-error">
          We could not load the books right now. Please try again in a moment.
        </p>
      ) : books.length === 0 ? (
        <div className="text-center">
          <p className="text-base-content/70">
            No books have been added yet. Be the first to add one!
          </p>
          <Link href="/add-book" className="btn btn-primary mt-6">
            Add a Book
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map(
              (book: Book): JSX.Element => (
                <BookCard key={book._id} book={book} />
              ),
            )}
          </div>
          <div className="mt-10 text-center">
            <Link href="/books" className="btn btn-primary">
              See All Books
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
