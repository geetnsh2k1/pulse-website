"use client";

// A 2px amber progress line under the nav — long page, visible position.
// rAF-throttled; hidden for reduced-motion users (it's pure decoration).
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-amber shadow-[0_0_8px_rgba(255,171,51,0.6)]"
    />
  );
}
