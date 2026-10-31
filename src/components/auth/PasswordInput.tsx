"use client";

import { useState } from "react";
import type { ChangeEvent, JSX } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
}

export default function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
}: PasswordInputProps): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          onChange(event.target.value)
        }
        required
        autoComplete={autoComplete}
        placeholder="Enter your password"
        className="input w-full pr-12"
      />
      <button
        type="button"
        onClick={(): void => setVisible(!visible)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-4 text-base-content/60"
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
