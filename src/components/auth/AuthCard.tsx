import type { JSX, ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps): JSX.Element {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-box border border-base-300 bg-base-200/50 p-6 shadow-sm sm:p-8">
        <h1 className="section-title text-center">{title}</h1>
        <p className="mt-2 text-center text-sm text-base-content/70">
          {subtitle}
        </p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
