interface SkillGroup {
  title: string;
  items: string[];
}

const defaultSkills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Kotlin", "SQL", "HTML5/CSS3"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend & Data",
    items: ["Node.js", "Express.js", "FastAPI", "Flask", "MongoDB", "PostgreSQL", "Redis", "REST APIs"],
  },
  {
    title: "DevOps & Tools",
    items: ["Docker", "Docker Compose", "Git", "GitHub Actions", "Linux / Bash", "Postman", "Nginx"],
  },
];

export default function Skills({ groups = defaultSkills }: { groups?: SkillGroup[] }) {
  return (
    <section id="skills" className="py-8 sm:py-12 border-b border-border">
      <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-4 sm:mb-6">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
        {groups.map((group) => (
          <div key={group.title} className="p-3.5 sm:p-4 rounded-lg bg-surface border border-border">
            <h3 className="font-mono text-xs uppercase tracking-wider text-accent font-medium mb-2.5 sm:mb-3">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-mono text-[10.5px] xs:text-xs text-text px-2 py-0.5 sm:py-1 rounded bg-bg border border-border"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
