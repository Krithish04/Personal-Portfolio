export default function SectionHead({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  index?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {subtitle && <p className="text-text-muted text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
