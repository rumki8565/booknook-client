"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent, JSX, MouseEvent } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import type { Book } from "@/types/book";

const BORROW_DAYS: number = 7;

function getReturnDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + BORROW_DAYS);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface BorrowSectionProps {
  book: Book;
}

export default function BorrowSection({
  book,
}: BorrowSectionProps): JSX.Element {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [returnBy, setReturnBy] = useState<string>("");

  const isAvailable: boolean = book.availableCopies > 0;

  const openModal = (): void => {
    setReturnBy(getReturnDate());
    setIsOpen(true);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget && !loading) {
      setIsOpen(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    try {
      await authFetch<{ message: string }>("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id }),
      });

      toast.success("Book borrowed successfully! Find it in My Borrows.");
      setIsOpen(false);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not borrow the book. Please try again.",
      );
      setIsOpen(false);
    } finally {
      setLoading(false);
      // Reload the page data so the copies count is up to date
      router.refresh();
    }
  };

  return (
    <>
      {isAvailable ? (
        <button
          type="button"
          onClick={openModal}
          className="btn btn-primary w-full sm:w-fit"
        >
          Borrow This Book
        </button>
      ) : (
        <button type="button" disabled className="btn w-full sm:w-fit">
          Not Available
        </button>
      )}

      {isOpen && (
        <div
          className="modal modal-open"
          role="dialog"
          aria-modal="true"
          aria-labelledby="borrow-title"
          onClick={handleBackdropClick}
        >
          <div className="modal-box">
            <h3 id="borrow-title" className="text-xl font-bold text-primary">
              Borrow This Book
            </h3>
            <p className="mt-2 text-sm text-base-content/70">
              You are borrowing{" "}
              <span className="font-semibold">{book.title}</span>. Please return
              it by {returnBy}.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="space-y-1">
                <label htmlFor="borrow-name" className="text-sm font-medium">
                  Your Name
                </label>
                <input
                  id="borrow-name"
                  type="text"
                  readOnly
                  value={session?.user.name ?? ""}
                  className="input w-full cursor-not-allowed opacity-70"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="borrow-email" className="text-sm font-medium">
                  Your Email
                </label>
                <input
                  id="borrow-email"
                  type="email"
                  readOnly
                  value={session?.user.email ?? ""}
                  className="input w-full cursor-not-allowed opacity-70"
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={(): void => setIsOpen(false)}
                  disabled={loading}
                  className="btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "Confirm Borrow"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
