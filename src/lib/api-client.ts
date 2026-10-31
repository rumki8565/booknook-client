import { API_URL } from "./config";

async function getToken(): Promise<string> {
  const response: Response = await fetch("/api/token", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Please log in again.");
  }

  const data = (await response.json()) as { token: string };
  return data.token;
}

function getMessage(data: unknown): string | null {
  if (typeof data === "object" && data !== null && "message" in data) {
    const message: unknown = (data as { message: unknown }).message;
    return typeof message === "string" ? message : null;
  }
  return null;
}

// Calls the Express server with the user's JWT
export async function authFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token: string = await getToken();

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  const response: Response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  const data: unknown = await response.json().catch((): null => null);

  if (!response.ok) {
    throw new Error(
      getMessage(data) ?? "Something went wrong. Please try again.",
    );
  }

  return data as T;
}
