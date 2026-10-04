import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const edu = [
  {
    school: "Christ University",
    degree: "Master of Computer Application (Delhi NCR)",
    focus: "Focus: Full-Stack Development & DevOps",
    location: "Delhi NCR",
    date: "Pursuing 05/2027",
  },
  {
    school: "St. Aloysius (Autonomous) College",
    degree: "Bachelor of Computer Applications (BCA)",
    focus: "Focus: Full-Stack Development",
    location: "Mangalore, Karnataka",
    date: "04/2025",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="06" title="Education" />
        <Reveal>
          <div className="space-y-1">
            {edu.map((e, i) => (
              <div
                key={e.school}
                className={`flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-5 py-4 sm:py-6 ${
                  i !== edu.length - 1 ? "border-b border-linesoft" : ""
                }`}
              >
                <div className="max-w-[620px]">
                  <div className="font-bold text-[15.5px] xs:text-[16.5px] sm:text-[17px] text-primary">{e.school}</div>
                  <div className="text-muted text-[13px] xs:text-[13.5px] sm:text-[14.5px] mt-1 leading-relaxed">{e.degree}</div>
                  <div className="font-mono text-xs text-amber mt-1 font-medium">{e.focus}</div>
                </div>
                <div className="font-mono text-[11px] sm:text-[12.5px] text-dim text-left sm:text-right mt-1 sm:mt-0 flex-shrink-0">
                  <span>{e.location}</span>
                  <span className="hidden sm:inline"><br /></span>
                  <span className="inline sm:hidden"> · </span>
                  <span>{e.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
