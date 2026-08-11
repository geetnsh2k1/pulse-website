"use client";

// The debugging showcase: a rail of four X-ray views beside one terminal.
// Each rail card carries its command and its name; the pane below the
// output explains what you're looking at, so the frame stays uncluttered.
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
    <div className="grid items-start gap-6 min-[1040px]:grid-cols-[320px_minmax(0,1fr)]">
      {/* rail */}
      <div
        role="tablist"
        aria-label="debugging views"
        className="grid gap-[9px] min-[620px]:grid-cols-2 min-[1040px]:grid-cols-1"
      >
        {tabs.map((t, i) => {
          const on = i === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => pick(i)}
              className={`group flex cursor-pointer flex-col gap-[7px] rounded-[14px] border px-[18px] py-4 text-left transition-colors duration-200 ${
                on ? "border-amber/40 bg-amber/[0.06]" : "border-edge bg-panel hover:border-edge2"
              }`}
            >
              <span className={`truncate font-mono text-[11px] ${on ? "text-amber" : "text-faint"}`}>
                $ {t.cmd}
              </span>
              <span
                className={`text-[15px] font-semibold tracking-[-0.02em] transition-colors ${
                  on ? "text-fg" : "text-dim group-hover:text-fg"
                }`}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* the active view, with its caption pinned under the output */}
      <div className="term min-w-0 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="term-head">
          <span className="dot bg-[#ff5f57]" />
          <span className="dot bg-[#febc2e]" />
          <span className="dot bg-[#28c840]" />
          <span className="ml-2 truncate">{tabs[active].cmd}</span>
        </div>
        {/* fixed stage on desktop so switching tabs never resizes the page;
            free-flowing below that, where the frames are the tallest thing
            on screen anyway */}
        <div className="flex flex-col min-[1040px]:h-[32.2em]">
          <div className="min-h-0 flex-1 overflow-auto">
            <div
              key={active}
              className="term-body rise !pb-6 !text-[12.8px]"
              dangerouslySetInnerHTML={{ __html: tabs[active].frame }}
            />
          </div>
          <div className="flex shrink-0 items-start gap-3.5 border-t border-edge bg-bg px-6 py-4">
            <span
              aria-hidden="true"
              className="grid size-6 shrink-0 place-items-center rounded-[7px] border border-amber/[0.28] bg-amber/[0.08] font-mono text-[12px] text-amber"
            >
              i
            </span>
            <p className="text-[13.5px] leading-[1.6] text-dim">{tabs[active].caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
