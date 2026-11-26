"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import AdminLogoutButton from "./AdminLogoutButton";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  BookOpen,
  Briefcase,
  FileText,
  Mail,
  BarChart3,
  ImageIcon,
  ToggleLeft,
  Settings,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Profile", href: "/admin/profile", icon: User },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Experience & Skills", href: "/admin/experience", icon: Briefcase },
  { label: "Resume", href: "/admin/resume", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Media", href: "/admin/media", icon: ImageIcon },
  { label: "Features", href: "/admin/features", icon: ToggleLeft },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminNav({ sessionEmail }: { sessionEmail: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 h-14 border-b border-border bg-surface px-4 flex items-center justify-between">
        <Link
          href="/admin"
          className="font-serif text-base font-semibold tracking-tight text-text flex items-center gap-2"
        >
          <span>Portfolio Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close admin navigation" : "Open admin navigation"}
            aria-expanded={mobileOpen}
            className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-accent active:bg-bg transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-bg/60 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-h-[85vh] overflow-y-auto bg-surface border-b border-border p-4 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                <span className="font-serif text-base font-semibold text-text">
                  Admin Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded text-text-muted hover:text-text"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-1" aria-label="Mobile Admin Navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-accent/10 text-accent font-semibold"
                          : "text-text-muted hover:text-text hover:bg-bg/60 active:bg-bg"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="text-text-muted truncate max-w-[180px]">
                {sessionEmail}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  target="_blank"
                  className="text-accent hover:underline inline-flex items-center gap-1"
                >
                  <span>Site</span>
                  <ExternalLink size={11} />
                </Link>
                <AdminLogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-60 border-r border-border bg-surface shrink-0 flex-col justify-between sticky top-0 h-screen">
        <div>
          {/* Admin Header */}
          <div className="h-16 px-5 border-b border-border flex items-center justify-between">
            <Link
              href="/admin"
              className="font-serif text-lg font-semibold tracking-tight text-text flex items-center gap-2 hover:text-accent transition-colors"
            >
              <span>Portfolio Admin</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-sm font-sans" aria-label="Desktop Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-text-muted hover:text-text hover:bg-bg"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Session Info & Logout */}
        <div className="p-4 border-t border-border flex flex-col gap-2">
          <div className="text-xs font-mono text-text-muted truncate" title={sessionEmail}>
            {sessionEmail}
          </div>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-accent hover:underline inline-flex items-center gap-1 font-mono"
            >
              <span>View Site</span>
              <ExternalLink size={12} />
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}
