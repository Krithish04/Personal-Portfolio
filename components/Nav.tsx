"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavProps {
  showBlog?: boolean;
  showResume?: boolean;
  showContact?: boolean;
}

export default function Nav({
  showBlog = true,
  showResume = true,
  showContact = true,
}: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    ...(showBlog ? [{ label: "Blog", href: "/blog" }] : []),
    ...(showResume ? [{ label: "Resume", href: "/resume" }] : []),
    ...(showContact ? [{ label: "Contact", href: "/contact" }] : []),
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="w-full border-b border-border bg-bg/95 backdrop-blur-sm sticky top-0 z-40 transition-colors">
      <div className="max-w-container mx-auto px-4 sm:px-6 md:px-8 h-15 sm:h-16 flex items-center justify-between">
        {/* Name / Brand */}
        <Link
          href="/"
          className="font-serif text-base xs:text-lg sm:text-xl font-semibold tracking-tight text-text hover:text-accent transition-colors truncate max-w-[220px] xs:max-w-none"
        >
          Krithish Suvarna
        </Link>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <nav aria-label="Main Navigation" className="flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors py-1 ${
                    isActive
                      ? "text-accent font-medium"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-accent active:bg-surface transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Backdrop */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[60px] bg-bg/40 backdrop-blur-xs md:hidden z-40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile Navigation"
            className="relative z-50 md:hidden border-t border-border bg-surface px-4 py-3 space-y-1 shadow-lg"
          >
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent font-semibold"
                      : "text-text-muted hover:text-text hover:bg-bg/60 active:bg-bg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
}
