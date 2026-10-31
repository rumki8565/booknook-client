import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { JSX } from "react";
import BorrowSection from "@/components/BorrowSection";
import { getBook } from "@/lib/api";
import type { Book } from "@/types/book";

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const book: Book | null = await getBook(id);
    return { title: book ? book.title : "Book Not Found" };
  } catch {
    return { title: "Book Details" };
  }
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps): Promise<JSX.Element> {
  const { id } = await params;
  const book: Book | null = await getBook(id);

  if (!book) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/books" className="btn btn-ghost btn-sm mb-6">
        ← Back to All Books
      </Link>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={book.image}
          alt={book.title}
          className="h-80 w-full rounded-box object-cover sm:h-[28rem] md:h-full md:max-h-[34rem]"
        />

        <div className="flex flex-col gap-4">
          <span className="badge badge-secondary badge-soft w-fit">
            {book.category}
          </span>
          <h1 className="section-title">{book.title}</h1>
          <p className="text-lg text-base-content/70">by {book.author}</p>
          <p className="whitespace-pre-line leading-relaxed">
            {book.description}
          </p>

          <dl className="grid grid-cols-2 gap-4 rounded-box border border-base-300 bg-base-200/50 p-5 text-sm">
            <div>
              <dt className="text-base-content/60">Added by</dt>
              <dd className="font-semibold">{book.addedByName}</dd>
            </div>
            <div>
              <dt className="text-base-content/60">Email</dt>
              <dd className="break-all font-semibold">{book.addedByEmail}</dd>
            </div>
            <div>
              <dt className="text-base-content/60">Added on</dt>
              <dd className="font-semibold">{formatDate(book.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-base-content/60">Copies available</dt>
              <dd className="font-semibold">
                {book.availableCopies} of {book.totalCopies}
              </dd>
            </div>
          </dl>

          <BorrowSection book={book} />
        </div>
      </div>
    </section>
  );
}
