"use client";

// Client-side leaves: tracked links and scroll reveals. Every user action
// sends one deliberate PostHog event (autocapture stays off).
import { useEffect, useRef } from "react";
import Link from "next/link";
import { track } from "./posthog-provider";

// Route links ("/vs/…") navigate client-side; hashes and off-site URLs stay
// plain anchors. Callers just pass an href and stop thinking about it.
export function TrackLink({
  href, event, props, className, children, "aria-label": ariaLabel,
}: {
  href: string; event: string; props?: Record<string, string>; className?: string;
  children: React.ReactNode; "aria-label"?: string;
}) {
  const onClick = () => track(event, props);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  );
}

// Reveal-on-scroll wrapper; also emits one-time section_view events so the
// funnel shows exactly where readers stop scrolling. `delay` staggers
// siblings (ms) via --reveal-delay.
export function Reveal({
  children, section, delay = 0, className = "",
}: {
  children: React.ReactNode; section?: string; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      if (section) track("section_view", { section });
      return;
    }
    // Already on screen at mount (above the fold, anchor jump, tall
    // viewport)? Show immediately — never gate visible content on IO timing.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("in");
      if (section) track("section_view", { section });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            if (section) track("section_view", { section });
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [section]);
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
