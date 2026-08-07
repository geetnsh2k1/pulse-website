"use client";

// The interactive "how it works": three steps that auto-advance like a
// player (progress bar = CSS animation; its animationend drives the next
// step, so hover-pause keeps bar and timing perfectly in sync — and under
// reduced motion the CSS kills the animation, which stops auto-advance
// with no JS needed). Clicking a step takes manual control and fires
// how_it_works_step.
import { useState } from "react";
import { track } from "./posthog-provider";

export type Step = {
  id: string;
  cmd: string; // shown in the terminal title bar
  title: string;
  blurb: string;
  frame: string; // pre-rendered HTML, verbatim CLI output
};

export function HowItWorks({ steps, dur = 7000 }: { steps: Step[]; dur?: number }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    setAuto(false); // the reader took the wheel
    track("how_it_works_step", { step: steps[i].id });
  };

  return (
    <div
      className={`grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-10 ${paused ? "paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* steps */}
      <div className="flex flex-col gap-2.5">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              onClick={() => pick(i)}
              aria-current={on ? "step" : undefined}
              className={`group relative cursor-pointer rounded-xl border p-5 text-left transition-colors duration-300 ${
                on ? "border-amber/35 bg-panel" : "border-edge bg-transparent hover:border-edge2"
              }`}
            >
              <div className="flex items-baseline gap-3.5">
                <span className={`font-mono text-[13px] tracking-widest ${on ? "text-amber" : "text-faint"}`}>
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-[16.5px] font-semibold transition-colors ${on ? "text-fg" : "text-dim group-hover:text-fg"}`}>
                    {s.title}
                  </h3>
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-400 ease-out"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-dim">{s.blurb}</p>
                  </div>
                </div>
              </div>
              {on && auto && (
                <span
                  key={active}
                  className="stepbar absolute inset-x-5 bottom-0"
                  style={{ "--dur": `${dur}ms` } as React.CSSProperties}
                  onAnimationEnd={() => setActive((a) => (a + 1) % steps.length)}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* terminal frame for the active step */}
      <div className="term self-start">
        <div className="term-head">
          <span className="dot bg-[#ff5f57]" />
          <span className="dot bg-[#febc2e]" />
          <span className="dot bg-[#28c840]" />
          <span className="ml-2 truncate">{steps[active].cmd}</span>
        </div>
        <div
          key={active}
          className="term-body rise min-h-[16em] text-[13px]"
          dangerouslySetInnerHTML={{ __html: steps[active].frame }}
        />
      </div>
    </div>
  );
}
