import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const edu = [
  {
    school: "Christ University",
    degree: "Master of Computer Application — Full-Stack Development & DevOps",
    location: "Delhi NCR",
    date: "Expected 05/2027",
  },
  {
    school: "St. Aloysius (Autonomous) College",
    degree: "Bachelor of Computer Applications (BCA) — Full-Stack Development",
    location: "Mangalore, Karnataka",
    date: "04/2025",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-12 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="06" title="Education" />
        <Reveal>
          <div>
            {edu.map((e, i) => (
              <div
                key={e.school}
                className={`flex justify-between items-start gap-3 sm:gap-5 py-5 sm:py-6 flex-wrap ${
                  i !== edu.length - 1 ? "border-b border-linesoft" : ""
                }`}
              >
                <div className="max-w-[580px]">
                  <div className="font-bold text-[16px] sm:text-[17px]">{e.school}</div>
                  <div className="text-muted text-[13.5px] sm:text-[14.5px] mt-1 leading-relaxed">{e.degree}</div>
                </div>
                <div className="font-mono text-[11.5px] sm:text-[12.5px] text-dim text-left sm:text-right">
                  {e.location}
                  <br />
                  {e.date}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
