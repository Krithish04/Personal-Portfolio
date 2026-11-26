"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Authentication failed. Check your credentials.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Unable to connect to authentication service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-bg text-text">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm p-6 sm:p-8 rounded-lg bg-surface border border-border shadow-sm">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Back to site
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-text mt-3">
            Admin Sign In
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Sign in to manage portfolio content and settings.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-mono text-text-muted mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text focus:border-accent outline-none transition-colors"
              placeholder="you@domain.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-mono text-text-muted mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text focus:border-accent outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
