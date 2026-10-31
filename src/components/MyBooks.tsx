"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import toast from "react-hot-toast";
import { authFetch, fetchBooksByEmail } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import type { Book } from "@/types/book";
import ConfirmModal from "./ConfirmModal";
import EditBookModal from "./EditBookModal";
import Spinner from "./Spinner";

export default function MyBooks(): JSX.Element {
  const { data: session } = authClient.useSession();
  const email: string | undefined = session?.user.email;

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect((): (() => void) => {
    let ignore: boolean = false;

    if (email) {
      fetchBooksByEmail(email)
        .then((list: Book[]): void => {
          if (!ignore) {
            setBooks(list);
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
    }

    // Ignore the result if the page changed before the request finished
    return (): void => {
      ignore = true;
    };
  }, [email, reloadKey]);

  const handleSaved = (): void => {
    setBookToEdit(null);
    setReloadKey((key: number): number => key + 1);
  };

  const handleDelete = async (): Promise<void> => {
    if (!bookToDelete) {
      return;
    }
    const deletedId: string = bookToDelete._id;

    setDeleting(true);
    try {
      await authFetch<{ message: string }>(`/books/${deletedId}`, {
        method: "DELETE",
      });
      setBooks((current: Book[]): Book[] =>
        current.filter((book: Book): boolean => book._id !== deletedId),
      );
      toast.success("Book deleted successfully.");
      setBookToDelete(null);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not delete the book. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Spinner label="Loading your books..." />;
  }

  if (hasError) {
    return (
      <p className="text-center text-error">
        We could not load your books right now. Please try again in a moment.
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center">
        <p className="text-base-content/70">
          You have not added any books yet.
        </p>
        <Link href="/add-book" className="btn btn-primary mt-6">
          Add a Book
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-box border border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Copies</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(
              (book: Book): JSX.Element => (
                <tr key={book._id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-16 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="min-w-40 font-semibold">
                    <Link
                      href={`/books/${book._id}`}
                      className="link link-hover"
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="min-w-32">{book.author}</td>
                  <td>
                    <span className="badge badge-secondary badge-soft">
                      {book.category}
                    </span>
                  </td>
                  <td className="whitespace-nowrap">
                    {book.availableCopies} of {book.totalCopies}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={(): void => setBookToEdit(book)}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(): void => setBookToDelete(book)}
                        className="btn btn-error btn-outline btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      {bookToEdit && (
        <EditBookModal
          key={bookToEdit._id}
          book={bookToEdit}
          onClose={(): void => setBookToEdit(null)}
          onSaved={handleSaved}
        />
      )}

      {bookToDelete && (
        <ConfirmModal
          title="Delete this book?"
          message={`"${bookToDelete.title}" will be removed from the library. Any borrow records for it will be removed too. This cannot be undone.`}
          confirmLabel="Yes, Delete"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={(): void => setBookToDelete(null)}
        />
      )}
    </>
  );
}
