"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { JSX } from "react";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";

interface NavUser {
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

// Close a daisyUI dropdown after a click
function closeMenu(): void {
  const active: Element | null = document.activeElement;
  if (active instanceof HTMLElement) {
    active.blur();
  }
}

export default function Navbar(): JSX.Element {
  const pathname: string = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user: NavUser | null = session
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
      }
    : null;

  const visibleItems: NavItem[] = navItems.filter(
    (item: NavItem): boolean => !item.isPrivate || user !== null,
  );

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async (): Promise<void> => {
    closeMenu();
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("Logout failed. Please try again.");
      return;
    }
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  const links: JSX.Element[] = visibleItems.map(
    (item: NavItem): JSX.Element => (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={closeMenu}
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
      <div className="navbar mx-auto max-w-7xl px-2 sm:px-4">
        <div className="navbar-start w-auto flex-1 gap-1 lg:w-1/2 lg:flex-none">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square btn-sm sm:btn-md"
              aria-label="Open menu"
            >
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
            >
              {links}
              {!isPending && !user && (
                <li className="sm:hidden">
                  <Link href="/register" onClick={closeMenu}>
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{links}</ul>
        </nav>

        <div className="navbar-end w-auto shrink-0 gap-2 lg:w-1/2">
          {isPending ? (
            <div className="skeleton h-10 w-24 rounded-field" />
          ) : user ? (
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
                  <Link href="/profile" onClick={closeMenu}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
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
                className="btn btn-primary btn-sm hidden sm:inline-flex sm:btn-md"
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
