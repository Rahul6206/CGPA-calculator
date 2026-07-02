import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "SGPA to CGPA", href: "/sgpa-to-cgpa" },
  { label: "CGPA to %", href: "/cgpa-to-percentage" },
  { label: "% to CGPA", href: "/percentage-to-cgpa" },
  { label: "% to SGPA", href: "/percentage-to-sgpa" },
  { label: "Subject SGPA", href: "/sgpa-calculator" },
  { label: "Target CGPA", href: "/target-cgpa" },
  { label: "Attendance", href: "/attendance-planner" },
  { label: "Settings", href: "/settings" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-canvas-soft-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="absolute left-0 top-full w-full h-[calc(100vh-4rem)] z-50 bg-canvas animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="mx-auto max-w-[1200px] px-4 py-6 "
            onClick={(e) => e.stopPropagation()}
            

          >
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="body-md flex h-12 items-center rounded-lg px-4 text-ink no-underline transition-colors hover:bg-canvas-soft-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6 border-t border-hairline pt-6">
              <a
                href="/sgpa-calculator"
                className="body-sm-strong flex h-12 items-center justify-center rounded-[100px] bg-ink text-on-primary no-underline transition-opacity hover:opacity-90"
                onClick={() => setIsOpen(false)}
              >
                Calculate Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
