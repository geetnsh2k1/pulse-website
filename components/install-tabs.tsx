"use client";

// The conversion widget: brew / curl / go tabs with one copy button.
// Every copy fires copy_install { method, location } — the metric the
// whole page exists for, broken down by install method and placement.
import { useState } from "react";
import { track } from "./posthog-provider";

const METHODS = [
  {
    id: "brew",
    label: "brew",
    note: "macOS · recommended",
    cmd: "brew install --cask geetnsh2k1/pulse/pulse",
  },
  {
    id: "curl",
    label: "curl",
    note: "macOS · Linux",
    cmd: "curl -fsSL https://raw.githubusercontent.com/geetnsh2k1/pulse/master/scripts/install.sh | sh",
  },
  {
    id: "go",
    label: "go install",
    note: "needs the Go toolchain",
    cmd: "go install github.com/geetnsh2k1/pulse/cmd/pulse@latest",
  },
] as const;

export function InstallTabs({ location, className = "" }: { location: string; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const m = METHODS[idx];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(m.cmd);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = m.cmd;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    track("copy_install", { method: m.id, location });
    setTimeout(() => setCopied(false), 1700);
  };

  return (
    <div className={`w-full max-w-[660px] overflow-hidden rounded-[14px] border border-edge bg-bg text-left ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-edge px-3 py-2.5">
        <div role="tablist" aria-label="install method" className="seg">
          {METHODS.map((mm, i) => (
            <button
              key={mm.id}
              role="tab"
              aria-selected={i === idx}
              onClick={() => { setIdx(i); setCopied(false); }}
            >
              {mm.label}
            </button>
          ))}
        </div>
        <span className="pr-1.5 font-mono text-[11.5px] text-faint">{m.note}</span>
      </div>
      <div className="flex items-center gap-3 px-[18px] py-4">
        <span className="select-none font-mono text-amber">$</span>
        {/* wraps on a phone rather than scrolling: a command truncated mid-word
            behind the copy button reads as broken, and this is the one line on
            the page a visitor actually needs to see in full */}
        <code className="min-w-0 flex-1 break-all font-mono text-[13.5px] min-[620px]:overflow-x-auto min-[620px]:break-normal min-[620px]:whitespace-nowrap min-[620px]:[scrollbar-width:none]">
          {m.cmd}
        </code>
        <button
          onClick={copy}
          aria-label={`Copy ${m.label} install command`}
          className={`shrink-0 cursor-pointer rounded-lg border px-3.5 py-[7px] font-mono text-[12px] transition-colors ${
            copied
              ? "border-amber bg-amber/15 text-amber"
              : "border-edge text-dim hover:border-amber hover:text-amber"
          }`}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
    </div>
  );
}
