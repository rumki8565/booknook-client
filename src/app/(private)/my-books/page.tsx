import type { Metadata } from "next";
import type { JSX } from "react";
import MyBooks from "@/components/MyBooks";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "My Books",
};

export default function MyBooksPage(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        title="My Books"
        subtitle="The books you have added. You can update or remove them at any time."
      />
      <MyBooks />
    </section>
  );
}
