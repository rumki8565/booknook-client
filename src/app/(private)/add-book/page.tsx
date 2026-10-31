import type { Metadata } from "next";
import type { JSX } from "react";
import AddBookForm from "@/components/AddBookForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Add Book",
};

export default function AddBookPage(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        title="Add a Book"
        subtitle="Share a book with other readers. It will appear in the library right away."
      />
      <AddBookForm />
    </section>
  );
}
