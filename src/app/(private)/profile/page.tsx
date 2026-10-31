import type { Metadata } from "next";
import type { JSX } from "react";
import ProfileCard from "@/components/ProfileCard";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function ProfilePage(): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="section-title mb-8 text-center">My Profile</h1>
      <ProfileCard />
    </section>
  );
}
