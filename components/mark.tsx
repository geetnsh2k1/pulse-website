// The logo lockup: the heartbeat cut out of a rounded amber tile. Server
// rendered, zero JS. Pair it with the "pulse" wordmark — `<PulseMark />`
// alone is the app icon, never the brand.
export function PulseMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="var(--color-amber)" />
      <path
        d="M11 34 H23 L28 22 L36 44 L41 34 H53"
        fill="none"
        stroke="var(--color-amber-dark)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Wordmark + mark, the way it appears in the nav and the footer.
export function PulseLogo({ className = "", markClass = "h-[30px] w-[30px]" }: { className?: string; markClass?: string }) {
  return (
    <span className={`flex items-center gap-[11px] text-[19px] font-semibold tracking-[-0.03em] text-fg ${className}`}>
      <PulseMark className={`shrink-0 ${markClass}`} />
      pulse
    </span>
  );
}
