interface ExperienceItem {
  role: string;
  org: string;
  date: string;
  bullets: string[];
}

const defaultExperiences: ExperienceItem[] = [
  {
    role: "MERN Stack Intern",
    org: "Devisoft · Surat",
    date: "05/2026 – 07/2026",
    bullets: [
      "Built 15+ REST APIs and quotation CRUD features using Node.js, Express.js, and MongoDB, thoroughly tested via Postman.",
      "Developed 20+ reusable UI components in Next.js, standardizing frontend modules across the application.",
      "Implemented robust JWT authentication with role-based access control for development and QA teams.",
      "Diagnosed and resolved critical bugs, streamlining the quotation generation workflow on local testing environments.",
    ],
  },
  {
    role: "Full-Stack Developer & Automation Specialist",
    org: "Freelance · Remote",
    date: "01/2026 – 02/2026",
    bullets: [
      "Architected TeleCRM: A centralized lead management system integrating communication logs with a MERN stack backend for real-time sales tracking.",
      "Developed custom webhooks and WhatsApp Business API integrations for automated lead ingestion.",
      "Engineered an automated lead-conversion engine in Node.js, transitioning inbound inquiries into trackable sales opportunities.",
      "Optimized MongoDB schemas to maintain high transactional performance and data consistency.",
    ],
  },
];

export default function Experience({
  items = defaultExperiences,
}: {
  items?: ExperienceItem[];
}) {
  return (
    <section id="experience" className="py-8 sm:py-12 border-b border-border">
      <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-4 sm:mb-6">
        Experience
      </h2>
      <div className="space-y-6 sm:space-y-8">
        {items.map((exp, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-6">
            <div className="sm:w-48 shrink-0">
              <span className="font-mono text-xs text-accent sm:text-text-muted font-medium sm:font-normal">{exp.date}</span>
              <p className="font-sans text-xs sm:text-sm text-text-muted mt-0.5">{exp.org}</p>
            </div>
            <div className="flex-1 max-w-[580px] mt-1 sm:mt-0">
              <h3 className="font-sans text-sm xs:text-base font-semibold text-text">{exp.role}</h3>
              <ul className="mt-2 space-y-1.5 list-disc list-outside ml-4 text-xs xs:text-sm text-text-muted leading-relaxed">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
