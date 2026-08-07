"use client";

// The observability showcase: one terminal, four X-ray views. Reader-driven
// (no auto-play — the hero and stepper already move); each switch fires
// inspect_tab so we learn which capability actually pulls people in.
import { useState } from "react";
import { track } from "./posthog-provider";

export type InspectTab = {
  id: string;
  label: string;
  cmd: string; // terminal title bar
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
    <div>
      <div role="tablist" aria-label="inspect views" className="seg mb-5 flex flex-wrap">
        {tabs.map((t, i) => (
          <button key={t.id} role="tab" aria-selected={i === active} onClick={() => pick(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="term">
        <div className="term-head">
          <span className="dot bg-[#ff5f57]" />
          <span className="dot bg-[#febc2e]" />
          <span className="dot bg-[#28c840]" />
          <span className="ml-2 truncate">{tabs[active].cmd}</span>
        </div>
        <div
          key={active}
          className="term-body rise min-h-[19em] text-[12.8px]"
          dangerouslySetInnerHTML={{ __html: tabs[active].frame }}
        />
      </div>
      <p key={`cap-${active}`} className="rise mt-4 max-w-[70ch] text-[15px] text-dim">
        {tabs[active].caption}
      </p>
    </div>
  );
}
