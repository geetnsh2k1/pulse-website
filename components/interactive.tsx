"use client";

// Client-side leaves: everything that needs a handler or an observer —
// copy buttons, tracked links, and scroll reveals. Every user action sends
// one deliberate PostHog event.
import { useEffect, useRef, useState } from "react";
import { track } from "./posthog-provider";

export function CopyInstall({ command, method, className = "" }: { command: string; method: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = command;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    track("copy_install", { method });
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className={`inline-flex max-w-full items-center gap-3 rounded-[10px] border border-edge bg-bg px-[18px] py-3.5 ${className}`}>
      <span className="select-none font-mono text-amber">$</span>
      <code className="overflow-x-auto whitespace-nowrap font-mono text-sm [scrollbar-width:none]">{command}</code>
      <button
        onClick={copy}
        aria-label="Copy install command"
        className="cursor-pointer rounded-md border border-edge px-3 py-1 font-mono text-xs text-dim hover:border-amber hover:text-amber"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

export function TrackLink({
  href, event, props, className, children,
}: {
  href: string; event: string; props?: Record<string, string>; className?: string; children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => track(event, props)}>
      {children}
    </a>
  );
}

// Reveal-on-scroll wrapper; also emits one-time section_view events so the
// funnel shows where readers stop.
export function Reveal({ children, section, className = "" }: { children: React.ReactNode; section?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.classList.add("in");
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
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
