import type { JSX } from "react";

interface SpinnerProps {
  label?: string;
}

export default function Spinner({
  label = "Loading...",
}: SpinnerProps): JSX.Element {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
      role="status"
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <span className="text-sm text-base-content/70">{label}</span>
    </div>
  );
}
