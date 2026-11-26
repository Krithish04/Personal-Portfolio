import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";
import { ExternalLink } from "lucide-react";
import AdminNav from "./AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg text-text">
      {/* Responsive Navigation Component (Mobile Topbar + Drawer & Desktop Sidebar) */}
      <AdminNav sessionEmail={session.email} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 border-b border-border bg-surface/50 hidden md:flex items-center justify-between">
          <div className="text-xs font-mono text-text-muted">
            Logged in as Administrator
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-text-muted hover:text-text inline-flex items-center gap-1 font-mono transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink size={12} />
            </Link>
            <div className="h-4 w-px bg-border" />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 xs:p-6 sm:p-8 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
