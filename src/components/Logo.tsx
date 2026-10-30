import Link from "next/link";
import type { JSX } from "react";
import { FaBookOpen } from "react-icons/fa6";

export default function Logo(): JSX.Element {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-xl font-bold text-primary sm:text-2xl"
    >
      <FaBookOpen aria-hidden="true" />
      <span className="font-heading">BookNook</span>
    </Link>
  );
}
