import type { JSX } from "react";
import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import Logo from "./Logo";

interface SocialLink {
  label: string;
  href: string;
  Icon: IconType;
}

const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
];

export default function Footer(): JSX.Element {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-base-content/70">
            A small online library where you can add a book, borrow a book and
            return a book.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">Contact</h3>
          <ul className="space-y-2 text-sm text-base-content/80">
            <li className="flex items-center gap-2">
              <FaEnvelope aria-hidden="true" className="text-primary" />
              hello@booknook.example
            </li>
            <li className="flex items-center gap-2">
              <FaPhone aria-hidden="true" className="text-primary" />
              +880 1700-000000
            </li>
            <li className="flex items-center gap-2">
              <FaLocationDot aria-hidden="true" className="text-primary" />
              12 Library Road, Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">Follow Us</h3>
          <div className="flex gap-3">
            {socialLinks.map(
              ({ label, href, Icon }: SocialLink): JSX.Element => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="btn btn-circle btn-primary btn-outline btn-sm"
                >
                  <Icon />
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 py-4 text-center text-sm text-base-content/70">
        © {year} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
