"use client";

// The hero terminal: types the real golden demo in a loop. Verbatim outputs
// from the actual CLI — nothing invented. Reduced-motion users get the
// final frame, static.
import { useEffect, useRef } from "react";

type Step = { t: "type"; text: string } | { t: "out"; html: string };

const script: Step[] = [
  { t: "type", text: "pulse init shop --template api-and-worker --lang python" },
  { t: "out", html: '<span class="text-tgreen">✓</span> created project <b>shop</b> <span class="text-dim">from template api-and-worker (python)</span>\n  <span class="text-tgreen">✓</span> <span class="text-dim">installing python dependencies — done (6.6s)</span>' },
  { t: "type", text: "pulse start" },
  { t: "out", html: '<span class="text-amber">⚡ pulse</span> <span class="text-dim">0.1.0 —</span> <b>shop</b>\n  <span class="text-dim">api</span>        http://localhost:3000\n  <span class="text-dim">routes</span>     <b>POST</b> /orders <span class="text-dim">→</span> <span class="text-tcyan">createOrder</span>\n  <span class="text-dim">try</span>        <span class="text-amber">curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'</span>\n<span class="text-tgreen">ready in 99ms</span> <span class="text-dim">— edits apply live</span>' },
  { t: "type", text: 'curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'' },
  { t: "out", html: '<span class="text-dim">201</span> {"id":"e9b4…","status":"pending"}\n  <span class="text-tcyan">⚙ sqs order-events → worker · ok</span>\n<span class="text-amber">🎉 first background job processed — your async loop works end to end</span>' },
  { t: "type", text: "curl localhost:3000/orders/e9b4…" },
  { t: "out", html: '{"id":"e9b4…","status":<span class="text-tgreen">"processed"</span>}   <span class="text-dim">← the worker got there first</span>' },
  { t: "out", html: '<span class="text-dim">— an API, a queue, a worker, and a database. all local. —</span>' },
];

function esc(x: string) {
  return x.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => { if (!cancelled) fn(); }, ms);
      timers.push(id);
    };

    const render = (upTo: number, partial?: string) => {
      let html = "";
      for (let i = 0; i < upTo; i++) {
        const s = script[i];
        html += s.t === "type" ? `<span class="text-amber">$ ${esc(s.text)}</span>\n` : s.html + "\n\n";
      }
      if (partial !== undefined) html += `<span class="text-amber">$ ${esc(partial)}</span>`;
      el.innerHTML = html + '<span class="cursor-blink"></span>';
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(script.length);
      return;
    }

    let idx = 0;
    const step = () => {
      if (idx >= script.length) { later(() => { idx = 0; step(); }, 9000); return; }
      const s = script[idx];
      if (s.t === "type") {
        let pos = 0;
        const typeChar = () => {
          pos++;
          render(idx, s.text.slice(0, pos));
          if (pos < s.text.length) later(typeChar, 24 + Math.random() * 32);
          else { idx++; later(step, 340); }
        };
        typeChar();
      } else {
        idx++;
        render(idx);
        later(step, idx === script.length ? 60 : 950);
      }
    };
    step();

    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="term mx-auto mt-12 w-full max-w-[880px]">
      <div className="term-head">
        <span className="dot bg-[#ff5f57]" />
        <span className="dot bg-[#febc2e]" />
        <span className="dot bg-[#28c840]" />
        <span className="ml-2">~/shop — the whole loop, typed live</span>
        <span className="ml-auto flex items-center gap-2 normal-case">
          <span className="blip" aria-hidden="true" />
          <span className="text-tgreen">live</span>
        </span>
      </div>
      <div ref={ref} className="term-body min-h-[25em] text-[13.5px]">
        <span className="cursor-blink" />
      </div>
    </div>
  );
}
