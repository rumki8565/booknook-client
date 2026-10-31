import type { Metadata } from "next";
import type { JSX } from "react";
import MyBorrows from "@/components/MyBorrows";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "My Borrows",
};

export default function MyBorrowsPage(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading
        title="My Borrows"
        subtitle="The books you have borrowed. Return them when you are done reading."
      />
      <MyBorrows />
    </section>
  );
}
