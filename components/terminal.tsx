"use client";

// The hero terminal: types the real golden demo in a loop. Verbatim outputs
// from the actual CLI — nothing invented.
//
// Smoothness rules:
// - the body is FIXED height and scrolls internally like a real terminal,
//   so the page below never shifts as lines appear;
// - typing mutates one text node (no full re-render per keystroke);
// - output blocks fade in; the loop restart fades out instead of wiping;
// - reduced-motion users get the final frame, static.
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

// Server-rendered final frame: the terminal paints full at first paint (it is
// the largest element on mobile — an empty box would push LCP to whenever the
// typing loop finishes). Desktop fades from this into the live typing.
const FINAL_FRAME = script
  .map((s) =>
    s.t === "type"
      ? `<div><span class="text-amber">$ ${esc(s.text)}</span></div>`
      : `<div class="tout tout-ssr">${s.html}</div>`
  )
  .join("");

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

    const outBlock = (html: string) => {
      const d = document.createElement("div");
      d.className = "tout";
      d.innerHTML = html;
      return d;
    };

    // Keep the SSR frame static for reduced motion — and on phones, where
    // the CPU cost of a 30s typing loop isn't worth it and the static
    // transcript reads better.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    const cursor = document.createElement("span");
    cursor.className = "cursor-blink";
    const tail = () => { el.scrollTop = el.scrollHeight; };

    const typeLine = (text: string, done: () => void) => {
      const line = document.createElement("div");
      const prompt = document.createElement("span");
      prompt.className = "text-amber";
      prompt.textContent = "$ ";
      const typed = document.createElement("span");
      typed.className = "text-amber";
      line.append(prompt, typed, cursor); // appendChild moves the cursor here
      el.appendChild(line);
      tail();
      let pos = 0;
      const tick = () => {
        pos++;
        typed.textContent = text.slice(0, pos); // one text-node mutation per key
        tail();
        if (pos < text.length) later(tick, 13 + Math.random() * 21);
        else later(done, 260);
      };
      tick();
    };

    const run = (idx: number) => {
      if (idx >= script.length) {
        // hold the finished frame, then fade → clear → fade back in
        later(() => {
          el.classList.add("term-dim");
          later(() => {
            el.innerHTML = "";
            el.appendChild(cursor);
            el.scrollTop = 0;
            el.classList.remove("term-dim");
            later(() => run(0), 250);
          }, 480);
        }, 7000);
        return;
      }
      const s = script[idx];
      if (s.t === "type") {
        typeLine(s.text, () => run(idx + 1));
      } else {
        el.appendChild(outBlock(s.html));
        el.appendChild(cursor); // cursor waits on its own line below the output
        tail();
        later(() => run(idx + 1), idx === script.length - 1 ? 60 : 620);
      }
    };

    // Desktop: hold the SSR frame briefly (it just painted as LCP), then
    // fade out and replay the session live.
    later(() => {
      el.classList.add("term-dim");
      later(() => {
        el.innerHTML = "";
        el.appendChild(cursor);
        el.scrollTop = 0;
        el.classList.remove("term-dim");
        later(() => run(0), 200);
      }, 480);
    }, 700);

    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div className="term mx-auto mt-3 w-full max-w-[880px]">
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
      <div
        ref={ref}
        className="term-body term-stream h-[25em] overflow-y-auto overscroll-contain text-[13.5px] [scrollbar-width:thin]"
        dangerouslySetInnerHTML={{ __html: FINAL_FRAME }}
      />
    </div>
  );
}
