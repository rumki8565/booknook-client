import type { Metadata } from "next";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage(): JSX.Element {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="section-title">Privacy Policy</h1>
      <p className="mt-2 text-sm text-base-content/60">
        Last updated: November 2026
      </p>

      <div className="mt-8 space-y-8 leading-relaxed text-base-content/80">
        <p>
          BookNook is a small online library built as a course project. This
          page explains what information the site uses.
        </p>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">What we collect</h2>
          <p>
            When you register or log in with Google, we receive your name, email
            address and profile photo. When you add or borrow a book, we save
            that activity together with your name and email.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">How we use it</h2>
          <p>
            Only to run the library: to log you in, to show who added a book,
            and to list the books you added and borrowed. We do not sell your
            information, share it with advertisers or use it for marketing.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">Where it is stored</h2>
          <p>
            Your account and book data are stored in a MongoDB database. Book
            cover images you upload are hosted on imgbb. A session cookie keeps
            you logged in.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">
            Contact and removal
          </h2>
          <p>
            To ask for your account and data to be removed, write to
            your-email@example.com.
          </p>
        </div>
      </div>
    </section>
  );
}
