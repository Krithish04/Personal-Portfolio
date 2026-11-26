"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // Skip tracking for admin paths
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // Prevent duplicate track calls on same path render
    if (lastPath.current === pathname) {
      return;
    }
    lastPath.current = pathname;

    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || "",
        }),
      }).catch(() => {});
    } catch {}
  }, [pathname]);

  return null;
}
