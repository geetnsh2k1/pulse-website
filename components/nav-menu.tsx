"use client";

// The section links below 940px, where they don't fit in the bar. A panel
// under the nav rather than a full-screen sheet: the page is six sections, so
// covering it entirely would be more ceremony than the content deserves.
//
// Closes on Escape (focus returns to the button), on a click outside the nav,
// and on picking a link — the hrefs are hash anchors, so the panel would
// otherwise sit over the section it just scrolled to.
import { useEffect, useRef, useState } from "react";

export function NavMenu({ links, githubHref }: { links: [string, string][]; githubHref: string }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element | null)?.closest("nav")) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const bar = "absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-all duration-200 motion-reduce:transition-none";

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="nav-menu"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-[10px] border border-edge text-mute transition-colors hover:border-edge2 hover:text-fg min-[940px]:hidden"
      >
        <span className="relative block h-[11px] w-[18px]" aria-hidden="true">
          <span className={`${bar} ${open ? "top-[5px] rotate-45" : "top-0"}`} />
          <span className={`${bar} top-[5px] ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`${bar} ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
        </span>
      </button>

      {open && (
        <div
          id="nav-menu"
          /* solid, not translucent like the bar above it: at 95% the page text
             behind ghosted through and read as a rendering fault */
          className="absolute inset-x-0 top-full border-b border-edge bg-bg min-[940px]:hidden"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col px-[18px] py-1.5 min-[620px]:px-7">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-edge/60 py-3.5 text-[15px] text-mute transition-colors last:border-0 hover:text-amber"
              >
                {label}
              </a>
            ))}
            {/* the GitHub button in the bar is hidden under 620 — keep the link reachable */}
            <a
              href={githubHref}
              onClick={() => setOpen(false)}
              className="border-t border-edge/60 py-3.5 text-[15px] text-mute transition-colors hover:text-amber min-[620px]:hidden"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
