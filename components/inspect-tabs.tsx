"use client";

// The observability showcase: a rail of four X-ray views beside one
// terminal. Each rail card carries its command (eyebrow), name, and
// description — always visible, so nothing hides in a caption below.
// Reader-driven; each switch fires inspect_tab so we learn which
// capability actually pulls people in.
import { useState } from "react";
import { track } from "./posthog-provider";

export type InspectTab = {
  id: string;
  label: string;
  cmd: string; // terminal title bar + card eyebrow
  caption: string;
  frame: string; // pre-rendered HTML, verbatim CLI output
};

export function InspectTabs({ tabs }: { tabs: InspectTab[] }) {
  const [active, setActive] = useState(0);
  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    track("inspect_tab", { tab: tabs[i].id });
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[350px_1fr] lg:gap-8">
      {/* rail */}
      <div role="tablist" aria-label="inspect views" className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => pick(i)}
              className={`group cursor-pointer rounded-xl border p-4 text-left transition-colors duration-300 ${
                on ? "border-amber/35 bg-panel" : "border-edge bg-transparent hover:border-edge2"
              }`}
            >
              <p className={`truncate font-mono text-[11px] ${on ? "text-amber" : "text-faint"}`}>
                $ {t.cmd}
              </p>
              <h3 className={`mt-1.5 text-[15.5px] font-semibold transition-colors ${on ? "text-fg" : "text-dim group-hover:text-fg"}`}>
                {t.label}
              </h3>
              <p className="mt-1.5 hidden text-[13px] leading-snug text-dim lg:block">{t.caption}</p>
            </button>
          );
        })}
      </div>

      {/* terminal frame for the active view */}
      <div className="term self-start">
        <div className="term-head">
          <span className="dot bg-[#ff5f57]" />
          <span className="dot bg-[#febc2e]" />
          <span className="dot bg-[#28c840]" />
          <span className="ml-2 truncate">{tabs[active].cmd}</span>
        </div>
        <div
          key={active}
          className="term-body rise min-h-[21em] text-[12.8px]"
          dangerouslySetInnerHTML={{ __html: tabs[active].frame }}
        />
      </div>
    </div>
  );
}
