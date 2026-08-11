"use client";

// The count-up stat: the hero numbers land on their real value instead of
// just being there. Degrades to the final value under reduced motion.
import { useEffect, useRef } from "react";

// Animates 0 → to when scrolled into view, ease-out, ~1.2s.
export function CountUp({
  to, prefix = "", suffix = "", duration = 1200, className = "",
}: {
  to: number; prefix?: string; suffix?: string; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = `${prefix}${to}${suffix}`;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      el.textContent = final;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, prefix, suffix, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
