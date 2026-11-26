export default function About({
  content = "Strategic MCA candidate and Full-Stack Developer with proven expertise in architecting the MERN stack and Python-based microservices. Passionate about bridging the gap between high-quality software development and reliable infrastructure. Actively applying hands-on experience with Docker, automated CI/CD pipelines, and cloud-native patterns to build, containerize, and deploy scalable applications.",
}: {
  content?: string;
}) {
  return (
    <section id="about" className="py-12 border-b border-border">
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-4">
        About
      </h2>
      <p className="text-text-muted text-base leading-relaxed max-w-prose">
        {content}
      </p>
    </section>
  );
}
