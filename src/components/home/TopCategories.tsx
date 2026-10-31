import type { JSX } from "react";
import type { IconType } from "react-icons";
import {
  FaChildReaching,
  FaFeatherPointed,
  FaFlask,
  FaLandmark,
  FaLayerGroup,
} from "react-icons/fa6";
import SectionHeading from "../SectionHeading";

interface Category {
  name: string;
  text: string;
  Icon: IconType;
}

const categories: Category[] = [
  { name: "Fiction", text: "Stories and novels", Icon: FaFeatherPointed },
  { name: "Science", text: "Ideas and discoveries", Icon: FaFlask },
  { name: "History", text: "People and past events", Icon: FaLandmark },
  { name: "Kids", text: "Tales for young readers", Icon: FaChildReaching },
  { name: "Others", text: "Everything else", Icon: FaLayerGroup },
];

export default function TopCategories(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        title="Top Categories"
        subtitle="Every book in BookNook belongs to one of these shelves."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map(
          ({ name, text, Icon }: Category): JSX.Element => (
            <div
              key={name}
              className="flex h-full flex-col items-center rounded-box border border-base-300 bg-base-100 p-6 text-center shadow-sm"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-2xl text-secondary">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-lg font-bold">{name}</h3>
              <p className="mt-1 text-sm text-base-content/70">{text}</p>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
