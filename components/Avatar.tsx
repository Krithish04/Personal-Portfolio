"use client";

import Image from "next/image";

interface AvatarProps {
  size?: number;
  className?: string;
  alt?: string;
}

export default function Avatar({
  size = 120,
  className = "",
  alt = "Krithish Ravindra Suvarna",
}: AvatarProps) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`relative rounded-full overflow-hidden border-2 border-amber/60 bg-panel group flex-shrink-0 transition-transform duration-300 hover:scale-105 shadow-[0_0_25px_rgba(242,169,59,0.25)] ${className}`}
    >
      <Image
        src="/avatar.jpg"
        alt={alt}
        width={size}
        height={size}
        priority={size >= 100}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
}
