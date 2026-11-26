interface EducationItem {
  school: string;
  degree: string;
  date: string;
  location: string;
}

const defaultEducation: EducationItem[] = [
  {
    school: "Christ University",
    degree: "Master of Computer Applications (MCA)",
    date: "Expected 05/2027",
    location: "Delhi NCR",
  },
  {
    school: "St. Aloysius (Autonomous) College",
    degree: "Bachelor of Computer Applications (BCA)",
    date: "04/2025",
    location: "Mangalore, Karnataka",
  },
];

export default function Education({ items = defaultEducation }: { items?: EducationItem[] }) {
  return (
    <section id="education" className="py-8 sm:py-12 border-b border-border">
      <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-4 sm:mb-6">
        Education
      </h2>
      <div className="space-y-4">
        {items.map((edu, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
            <div>
              <h3 className="font-sans text-sm xs:text-base font-semibold text-text">{edu.school}</h3>
              <p className="text-xs sm:text-sm text-text-muted">{edu.degree}</p>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-text-muted shrink-0 mt-0.5 sm:mt-0">
              <span>{edu.location}</span> · <span>{edu.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
