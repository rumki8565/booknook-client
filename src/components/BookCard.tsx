import Link from "next/link";
import type { JSX } from "react";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps): JSX.Element {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm transition hover:shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        loading="lazy"
        className="h-64 w-full object-contain"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="badge badge-secondary badge-soft w-fit">
          {book.category}
        </span>
        <h3 className="line-clamp-1 text-xl font-bold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-base-content/70">
          by {book.author}
        </p>
        <div className="mt-auto pt-3">
          <Link href={`/books/${book._id}`} className="btn btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
