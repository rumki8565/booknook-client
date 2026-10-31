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
