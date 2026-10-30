"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";

export interface NavUser {
  name: string;
  email: string;
  image: string | null;
}

interface NavItem {
  label: string;
  href: string;
  isPrivate: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", isPrivate: false },
  { label: "All Books", href: "/books", isPrivate: false },
  { label: "Add Book", href: "/add-book", isPrivate: true },
  { label: "My Books", href: "/my-books", isPrivate: true },
  { label: "My Borrows", href: "/my-borrows", isPrivate: true },
];

interface NavbarProps {
  user: NavUser | null;
}

export default function Navbar({ user }: NavbarProps): JSX.Element {
  const pathname: string = usePathname();

  const visibleItems: NavItem[] = navItems.filter(
    (item: NavItem): boolean => !item.isPrivate || user !== null,
  );

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links: JSX.Element[] = visibleItems.map(
    (item: NavItem): JSX.Element => (
      <li key={item.href}>
        <Link
          href={item.href}
          className={
            isActive(item.href) ? "bg-primary text-primary-content" : ""
          }
        >
          {item.label}
        </Link>
      </li>
    ),
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
              aria-label="Open menu"
            >
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{links}</ul>
        </nav>

        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer"
                aria-label="Open user menu"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-primary font-bold text-primary-content">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
              >
                <li className="menu-title text-base-content">{user.name}</li>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  {/* Logout is connected in Step 6 */}
                  <button type="button">Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="btn btn-primary btn-outline btn-sm sm:btn-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm sm:btn-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
