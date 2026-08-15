import Reveal from "./Reveal";

export default function SectionHead({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className="flex items-baseline gap-4 mb-8">
      <span className="font-mono text-sm text-amber">{index}</span>
      <span className="font-mono font-bold text-[clamp(1.6rem,3vw,2.1rem)] tracking-tight">
        {title}
      </span>
      <div className="flex-1 h-px bg-line" />
    </Reveal>
  );
}
