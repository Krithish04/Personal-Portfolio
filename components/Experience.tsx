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
      "Built 15+ REST APIs and quotation CRUD features with Node.js, Express and MongoDB, and tested every endpoint in Postman.",
      "Developed 20+ reusable Next.js components, which cut frontend development time for later features by 25%.",
      "Implemented JWT authentication with role-based access for an internal team of 10+ developers and QA testers.",
      "Fixed critical bugs and deployed the app to the company's testing server, contributing to a 20% faster quotation workflow.",
    ],
  },
  {
    role: "Full-Stack Developer (Freelance)",
    org: "Remote",
    date: "01/2026 – 02/2026",
    bullets: [
      "Built TeleCRM, a lead-management system on a MERN backend that syncs mobile communication logs with sales interactions in real time.",
      "Integrated the WhatsApp Business API and social-media webhooks to automate lead capture, cutting manual data entry by 40%.",
      "Built a Node.js lead-conversion engine that turns inbound inquiries into trackable sales opportunities, and optimized MongoDB schemas for high-frequency transactions.",
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
