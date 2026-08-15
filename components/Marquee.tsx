const STACK = [
  "MongoDB",
  "Express.js",
  "React.js",
  "Node.js",
  "Next.js",
  "Python",
  "Docker",
  "GitHub Actions",
  "CI/CD",
  "REST APIs",
  "JWT Auth",
  "WhatsApp Business API",
];

export default function Marquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className="border-y border-linesoft py-5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-10" />
      <div className="flex gap-10 whitespace-nowrap animate-marquee w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[13px] text-dim flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-teal/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
