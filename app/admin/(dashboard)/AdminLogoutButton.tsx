"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs font-mono text-text-muted hover:text-red-500 transition-colors inline-flex items-center gap-1"
      aria-label="Log out of admin"
    >
      <LogOut size={13} />
      <span>Logout</span>
    </button>
  );
}
