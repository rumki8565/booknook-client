"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, JSX } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/imgbb";
import { bookCategories } from "@/types/book";
import type { BookCategory } from "@/types/book";

const MAX_IMAGE_SIZE: number = 5 * 1024 * 1024; // 5 MB

export default function AddBookForm(): JSX.Element {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file: File | undefined = event.target.files?.[0];
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement = event.currentTarget;
    const formData = new FormData(form);

    const image: FormDataEntryValue | null = formData.get("image");
    if (!(image instanceof File) || image.size === 0) {
      toast.error("Please choose a book image.");
      return;
    }
    if (!image.type.startsWith("image/")) {
      toast.error("The file must be an image.");
      return;
    }
    if (image.size > MAX_IMAGE_SIZE) {
      toast.error("The image must be smaller than 5 MB.");
      return;
    }

    const totalCopies: number = Number(formData.get("totalCopies"));
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      toast.error("Total copies must be a whole number of at least 1.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl: string = await uploadImage(image);

      await authFetch<{ message: string }>("/books", {
        method: "POST",
        body: JSON.stringify({
          title: String(formData.get("title") ?? "").trim(),
          author: String(formData.get("author") ?? "").trim(),
          category: String(formData.get("category") ?? ""),
          image: imageUrl,
          description: String(formData.get("description") ?? "").trim(),
          totalCopies,
        }),
      });

      toast.success("Book added successfully!");
      form.reset();
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not add the book. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-5 rounded-box border border-base-300 bg-base-200/50 p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-1">
        <label htmlFor="title" className="text-sm font-medium">
          Book Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="Enter the book title"
          className="input w-full"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="author" className="text-sm font-medium">
          Author Name
        </label>
        <input
          id="author"
          name="author"
          type="text"
          required
          placeholder="Enter the author name"
          className="input w-full"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue=""
            className="select w-full"
          >
            <option value="" disabled>
              Choose a category
            </option>
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
          <label htmlFor="totalCopies" className="text-sm font-medium">
            Total Copies
          </label>
          <input
            id="totalCopies"
            name="totalCopies"
            type="number"
            min={1}
            step={1}
            defaultValue={1}
            required
            className="input w-full"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="image" className="text-sm font-medium">
          Book Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required
          onChange={handleFileChange}
          className="file-input w-full"
        />
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Selected book cover preview"
            className="mt-3 h-48 w-36 rounded-box object-cover"
          />
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="description" className="text-sm font-medium">
          Short Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          placeholder="Write a few lines about the book"
          className="textarea h-28 w-full"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="userName" className="text-sm font-medium">
            Your Name
          </label>
          <input
            id="userName"
            type="text"
            readOnly
            value={session?.user.name ?? ""}
            className="input w-full cursor-not-allowed opacity-70"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="userEmail" className="text-sm font-medium">
            Your Email
          </label>
          <input
            id="userEmail"
            type="email"
            readOnly
            value={session?.user.email ?? ""}
            className="input w-full cursor-not-allowed opacity-70"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Adding Book...
          </>
        ) : (
          "Add Book"
        )}
      </button>
    </form>
  );
}
