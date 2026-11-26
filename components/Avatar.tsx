import Image from "next/image";

export default function Avatar({
  className = "",
  size = 112,
}: {
  className?: string;
  size?: number;
}) {
  const hasDimensionClass = /\b(w-|size-|h-)/.test(className);

  return (
    <div
      className={`relative overflow-hidden rounded-full border border-border shrink-0 aspect-square ${
        !hasDimensionClass ? "w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" : ""
      } ${className}`}
      {...(!hasDimensionClass && !className ? { style: { width: size, height: size } } : {})}
    >
      <Image
        src="/avatar.jpg"
        alt="Portrait of Krithish Suvarna"
        fill
        sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
        className="object-cover"
        priority
      />
    </div>
  );
}
