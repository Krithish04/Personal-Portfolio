import Link from "next/link";

interface FooterProps {
  showBlog?: boolean;
  showResume?: boolean;
}

export default function Footer({ showBlog = false, showResume = true }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border mt-auto py-8 sm:py-10 text-xs sm:text-sm text-text-muted bg-surface/40">
      <div className="max-w-container mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <span>© {currentYear} Krithish Ravindra Suvarna</span>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-mono text-xs">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/projects" className="hover:text-accent transition-colors">
            Projects
          </Link>
          {showBlog && (
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
          )}
          {showResume && (
            <Link href="/resume" className="hover:text-accent transition-colors">
              Resume
            </Link>
          )}
          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
