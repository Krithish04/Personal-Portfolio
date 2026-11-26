interface FooterProps {
  showPhone?: boolean;
}

export default function Footer({ showPhone = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border mt-auto py-8 sm:py-10 text-xs sm:text-sm text-text-muted bg-surface/40">
      <div className="max-w-container mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <span>© {currentYear} Krithish Ravindra Suvarna. Built with care.</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-5">
          <a
            href="mailto:suvarnakrithish24@gmail.com"
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
          {showPhone && (
            <a
              href="tel:+919428141156"
              className="hover:text-accent transition-colors whitespace-nowrap"
            >
              +91 9428141156
            </a>
          )}
          <a
            href="https://github.com/Krithish04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/krithish04"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
