// The brand motif: an ECG line whose lit segment sweeps like a monitor.
// Pure SVG + CSS (see .ecg-path in globals.css) — renders on the server,
// ships zero JS. Under reduced motion the whole line simply glows amber.
//
// crop:
//   "full"  — long flatline, complex in the middle (wide dividers, banners)
//   "mid"   — complex with short tails (hero flourish)
//   "tight" — just the heartbeat (logo marks, small accents)

const D =
  "M0 32 H228 L248 32 257 22 266 42 277 3 290 61 302 24 313 38 326 32 H640";

const VIEWS = {
  full: "0 0 640 64",
  mid: "150 0 340 64",
  tight: "222 0 116 64",
} as const;

export function PulseLine({
  className = "",
  crop = "full",
}: {
  className?: string;
  crop?: keyof typeof VIEWS;
}) {
  const sw = crop === "tight" ? 3 : 2;
  return (
    <svg
      viewBox={VIEWS[crop]}
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={D} className="ecg-base" strokeWidth={sw} strokeLinejoin="round" />
      <path
        d={D}
        className="ecg-path"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
