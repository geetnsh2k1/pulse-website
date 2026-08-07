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
    <div className={`w-full max-w-[680px] overflow-hidden rounded-xl border border-edge bg-bg2 text-left ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-edge px-3 py-2.5">
        <div role="tablist" aria-label="install method" className="seg border-0 bg-transparent p-0">
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
        <span className="px-1.5 font-mono text-[11.5px] text-faint">{m.note}</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="select-none font-mono text-amber">$</span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13.5px] [scrollbar-width:none]">
          {m.cmd}
        </code>
        <button
          onClick={copy}
          aria-label={`Copy ${m.label} install command`}
          className={`shrink-0 cursor-pointer rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
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
