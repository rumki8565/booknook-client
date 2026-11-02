import type { JSX } from "react";
import type { IconType } from "react-icons";
import {
  FaBookBookmark,
  FaMagnifyingGlass,
  FaRotateLeft,
} from "react-icons/fa6";
import SectionHeading from "../SectionHeading";
import FadeIn from "../FadeIn";

interface Step {
  title: string;
  text: string;
  Icon: IconType;
}

const steps: Step[] = [
  {
    title: "Find a Book",
    text: "Browse the library and open any book to read its details.",
    Icon: FaMagnifyingGlass,
  },
  {
    title: "Borrow It",
    text: "Log in, confirm your borrow and keep the book for 7 days.",
    Icon: FaBookBookmark,
  },
  {
    title: "Return It",
    text: "Finished reading? Return the book from My Borrows so others can enjoy it.",
    Icon: FaRotateLeft,
  },
];

export default function HowItWorks(): JSX.Element {
  return (
    <section className="bg-base-200/60">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionHeading
          title="How Borrowing Works"
          subtitle="Add a book, borrow a book, return a book. It takes three simple steps."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(
            ({ title, text, Icon }: Step, index: number): JSX.Element => (
              <FadeIn key={title} delay={index * 0.1} className="h-full">
                <div className="flex h-full flex-col items-center rounded-box border border-base-300 bg-base-100 p-8 text-center shadow-sm">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-primary-content">
                    <Icon aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-secondary">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-base-content/70">{text}</p>
                </div>
              </FadeIn>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
