import { cache } from "react";
import type { Book } from "@/types/book";

export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// limit is optional: getBooks(6) gives the 6 newest books
export async function getBooks(limit?: number): Promise<Book[]> {
  const query: string = limit ? `?limit=${limit}` : "";
  const response: Response = await fetch(`${API_URL}/books${query}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not load books");
  }

  return (await response.json()) as Book[];
}

// cache() lets the page and its title share one request
export const getBook = cache(async (id: string): Promise<Book | null> => {
  const response: Response = await fetch(
    `${API_URL}/books/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404 || response.status === 400) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Could not load the book");
  }

  return (await response.json()) as Book;
});
