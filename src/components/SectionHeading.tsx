import type { JSX } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps): JSX.Element {
  return (
    <div className="mb-10 text-center">
      <h2 className="section-title">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-base-content/70">{subtitle}</p>
    </div>
  );
}
