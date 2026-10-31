"use client";

import { useState } from "react";
import type { FormEvent, JSX, MouseEvent } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/api-client";
import { uploadImage } from "@/lib/imgbb";
import { bookCategories } from "@/types/book";
import type { Book, BookCategory } from "@/types/book";

const MAX_IMAGE_SIZE: number = 5 * 1024 * 1024; // 5 MB

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditBookModal({
  book,
  onClose,
  onSaved,
}: EditBookModalProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget && !loading) {
      onClose();
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const totalCopies: number = Number(formData.get("totalCopies"));
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be a whole number of at least 1.");
      return;
    }

    const file: FormDataEntryValue | null = formData.get("image");
    const hasNewImage: boolean = file instanceof File && file.size > 0;
    if (file instanceof File && hasNewImage) {
      if (!file.type.startsWith("image/")) {
        toast.error("The file must be an image.");
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("The image must be smaller than 5 MB.");
        return;
      }
    }

    setLoading(true);
    try {
      // Keep the old image unless the user chose a new one
      const imageUrl: string =
        file instanceof File && hasNewImage
          ? await uploadImage(file)
          : book.image;

      await authFetch<{ message: string }>(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: String(formData.get("title") ?? "").trim(),
          author: String(formData.get("author") ?? "").trim(),
          category: String(formData.get("category") ?? ""),
          image: imageUrl,
          description: String(formData.get("description") ?? "").trim(),
          totalCopies,
        }),
      });

      toast.success("Book updated successfully!");
      onSaved();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update the book. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal modal-open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-title"
      onClick={handleBackdropClick}
    >
      <div className="modal-box max-h-[90vh] w-11/12 max-w-2xl overflow-y-auto">
        <h3 id="edit-title" className="text-xl font-bold text-primary">
          Edit Book
        </h3>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label htmlFor="edit-title-input" className="text-sm font-medium">
              Book Title
            </label>
            <input
              id="edit-title-input"
              name="title"
              type="text"
              required
              defaultValue={book.title}
              className="input w-full"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="edit-author" className="text-sm font-medium">
              Author Name
            </label>
            <input
              id="edit-author"
              name="author"
              type="text"
              required
              defaultValue={book.author}
              className="input w-full"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="edit-category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="edit-category"
                name="category"
                required
                defaultValue={book.category}
                className="select w-full"
              >
                {bookCategories.map(
                  (category: BookCategory): JSX.Element => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="edit-copies" className="text-sm font-medium">
                Total Copies
              </label>
              <input
                id="edit-copies"
                name="totalCopies"
                type="number"
                min={1}
                step={1}
                required
                defaultValue={book.totalCopies}
                className="input w-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="edit-image" className="text-sm font-medium">
              Book Image (choose a file only if you want to change it)
            </label>
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className="h-24 w-16 shrink-0 rounded object-cover"
              />
              <input
                id="edit-image"
                name="image"
                type="file"
                accept="image/*"
                className="file-input w-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="edit-description" className="text-sm font-medium">
              Short Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              required
              defaultValue={book.description}
              className="textarea h-28 w-full"
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
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
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
