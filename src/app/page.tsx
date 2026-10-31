import type { JSX } from "react";
import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import TopCategories from "@/components/home/TopCategories";
import { getBooks } from "@/lib/api";
import type { Book } from "@/types/book";

export default async function HomePage(): Promise<JSX.Element> {
  let books: Book[] = [];
  let hasError: boolean = false;

  try {
    books = await getBooks(6);
  } catch {
    hasError = true;
  }

  return (
    <>
      <HeroSlider />
      <NewArrivals books={books} hasError={hasError} />
      <HowItWorks />
      <TopCategories />
    </>
  );
}
