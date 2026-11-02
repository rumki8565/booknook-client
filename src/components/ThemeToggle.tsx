"use client";

import { useSyncExternalStore } from "react";
import type { JSX } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

type Theme = "booknook" | "booknook-dark";

const STORAGE_KEY: string = "booknook-theme";

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return (): void => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "booknook-dark"
    ? "booknook-dark"
    : "booknook";
}

function getServerSnapshot(): Theme {
  return "booknook";
}

export default function ThemeToggle(): JSX.Element {
  const theme: Theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isDark: boolean = theme === "booknook-dark";

  const handleToggle = (): void => {
    const next: Theme = isDark ? "booknook" : "booknook-dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked, the theme still changes for this visit
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="btn btn-ghost btn-circle btn-sm sm:btn-md"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
