"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/api-client";
import type { Borrow } from "@/types/borrow";
import Spinner from "./Spinner";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyBorrows(): JSX.Element {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect((): (() => void) => {
    let ignore: boolean = false;

    authFetch<Borrow[]>("/borrows")
      .then((list: Borrow[]): void => {
        if (!ignore) {
          setBorrows(list);
          setHasError(false);
        }
      })
      .catch((): void => {
        if (!ignore) {
          setHasError(true);
        }
      })
      .finally((): void => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return (): void => {
      ignore = true;
    };
  }, []);

  const handleReturn = async (borrow: Borrow): Promise<void> => {
    setReturningId(borrow._id);
    try {
      await authFetch<{ message: string }>(`/borrows/${borrow._id}`, {
        method: "DELETE",
      });
      setBorrows((current: Borrow[]): Borrow[] =>
        current.filter((item: Borrow): boolean => item._id !== borrow._id),
      );
      toast.success(`"${borrow.bookTitle}" was returned successfully.`);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not return the book. Please try again.",
      );
    } finally {
      setReturningId(null);
    }
  };

  if (loading) {
    return <Spinner label="Loading your borrows..." />;
  }

  if (hasError) {
    return (
      <p className="text-center text-error">
        We could not load your borrowed books right now. Please try again in a
        moment.
      </p>
    );
  }

  if (borrows.length === 0) {
    return (
      <div className="text-center">
        <p className="text-base-content/70">
          You have not borrowed any books yet.
        </p>
        <Link href="/books" className="btn btn-primary mt-6">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-300">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map(
            (borrow: Borrow): JSX.Element => (
              <tr key={borrow._id}>
                <td>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={borrow.bookImage}
                    alt={borrow.bookTitle}
                    className="h-16 w-12 rounded object-cover"
                  />
                </td>
                <td className="min-w-40 font-semibold">
                  <Link
                    href={`/books/${borrow.bookId}`}
                    className="link link-hover"
                  >
                    {borrow.bookTitle}
                  </Link>
                </td>
                <td className="whitespace-nowrap">
                  {formatDate(borrow.borrowDate)}
                </td>
                <td className="whitespace-nowrap">
                  {formatDate(borrow.returnDate)}
                </td>
                <td>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={(): void => {
                        void handleReturn(borrow);
                      }}
                      disabled={returningId === borrow._id}
                      className="btn btn-primary btn-sm whitespace-nowrap"
                    >
                      {returningId === borrow._id ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        "Return Book"
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
