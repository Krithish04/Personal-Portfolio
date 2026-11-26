import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav />
      <main className="flex-1 max-w-[720px] w-full mx-auto px-6 py-24 flex flex-col justify-center items-start">
        <span className="font-mono text-xs text-accent uppercase tracking-wider mb-2">
          404 · Page Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-text tracking-tight mb-4">
          The requested page does not exist.
        </h1>
        <p className="text-text-muted text-base leading-relaxed mb-8 max-w-prose">
          It might have been moved, removed, or the feature may currently be turned off.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 rounded-md bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          ← Return to Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
