export default function About({
  content = "I'm an MCA student at Christ University (Delhi NCR), based in Surat. In 2026 I worked as a MERN stack intern at Devisoft and as a freelance developer, building a lead-management system with WhatsApp Business API integrations.\n\nMy personal projects are where I practise the full path from code to deployment. DineSync is a multi-tenant restaurant platform with real-time kitchen displays. TaskFlow is a project management app with role-based access, a Docker build and a GitHub Actions pipeline.\n\nI'm looking for internship and entry-level roles in full-stack, backend or DevOps engineering.",
}: {
  content?: string;
}) {
  const paragraphs = (content || "").split("\n\n").filter(Boolean);

  return (
    <section id="about" className="py-8 sm:py-12 border-b border-border">
      <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-3 sm:mb-4">
        About
      </h2>
      <div className="space-y-4 text-text-muted text-sm xs:text-base sm:text-[16.5px] leading-relaxed text-justify sm:text-left max-w-4xl text-pretty">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </section>
  );
}
