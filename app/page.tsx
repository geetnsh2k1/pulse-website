import { Terminal } from "@/components/terminal";
import { TrackLink, Reveal } from "@/components/interactive";
import { InstallTabs } from "@/components/install-tabs";
import { HowItWorks, type Step } from "@/components/how-it-works";
import { InspectTabs, type InspectTab } from "@/components/inspect-tabs";
import { PulseLine } from "@/components/pulse-line";
import { FlowDiagram } from "@/components/flow-diagram";
import { Spotlight, CountUp } from "@/components/fx";
import { ScrollProgress } from "@/components/scroll-progress";

const GH = "https://github.com/geetnsh2k1/pulse";
const GUIDE = `${GH}/blob/master/docs/GUIDE.md`;

// Small right-aligned doc pathway at the end of a section.
function LearnMore({ href, target, label }: { href: string; target: string; label: string }) {
  return (
    <div className="mt-7 text-right">
      <TrackLink
        href={href}
        event="outbound"
        props={{ target }}
        className="font-mono text-[13px] text-amber transition-colors hover:text-amber-soft"
      >
        {label} →
      </TrackLink>
    </div>
  );
}

// ⚠️ PLACEHOLDER QUOTES below (see `testimonials`). Replace them with real
// ones — or flip this to false — before sharing the site publicly.
const SHOW_TESTIMONIALS = true;

function SectionHead({ idx, kick, title, lede }: { idx: string; kick: string; title: string; lede?: string }) {
  return (
    <div className="max-w-[72ch]">
      <p className="kick mb-4">
        <span className="idx">[{idx}]</span> {kick}
      </p>
      <h2 className="text-balance text-[clamp(28px,4.5vw,44px)] font-bold leading-[1.08] tracking-tight">{title}</h2>
      {lede && <p className="mt-4 text-[clamp(16px,2.1vw,18.5px)] leading-relaxed text-dim">{lede}</p>}
    </div>
  );
}

// Competitor gaps get a visible ✗ so the compare table reads at a glance.
function gap(v: string) {
  if (v === "—" || v === "n/a" || v === "not available") {
    return (
      <>
        <span className="text-tred">✗</span>
        {v !== "—" && <span className="ml-1.5 text-faint">{v}</span>}
      </>
    );
  }
  return v;
}

const GitHubIcon = (
  <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function Page() {
  return (
    <>
      {/* structured data: SoftwareApplication + FAQPage as two top-level
          scripts (naive validators can't read @graph). FAQ JSON is generated
          from the same `faqs` array that renders below, so the schema always
          matches the visible text — a Google requirement. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <ScrollProgress />

      {/* ───────────────────────── nav ───────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-edge/70 bg-bg/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1160px] items-center gap-7 px-6">
          <a href="#top" className="flex items-center gap-2.5 text-[17px] font-bold text-fg">
            <PulseLine crop="tight" className="h-6 w-11" />
            pulse
          </a>
          <div className="ml-4 hidden gap-5 whitespace-nowrap md:flex lg:gap-6">
            <a className="text-[14px] text-dim transition-colors hover:text-fg" href="#features">Features</a>
            <a className="text-[14px] text-dim transition-colors hover:text-fg" href="#how">How it works</a>
            <a className="text-[14px] text-dim transition-colors hover:text-fg" href="#inspect">Inspect</a>
            <a className="text-[14px] text-dim transition-colors hover:text-fg" href="#compare">Compare</a>
            <TrackLink className="text-[14px] text-dim transition-colors hover:text-fg" href={`${GH}/blob/master/docs/GUIDE.md`} event="outbound" props={{ target: "docs" }}>
              Docs
            </TrackLink>
          </div>
          <div className="ml-auto flex items-center gap-3 whitespace-nowrap">
            <TrackLink href={GH} event="cta_click" props={{ cta: "github", location: "nav" }} className="btn btn-ghost !px-3.5 !py-2 text-[14px]" aria-label="pulse on GitHub">
              {GitHubIcon}
              <span className="hidden sm:inline md:hidden lg:inline">GitHub</span>
            </TrackLink>
            <TrackLink href="#get-started" event="cta_click" props={{ cta: "get-started", location: "nav" }} className="btn btn-primary !px-4 !py-2 text-[14px]">
              Get started
            </TrackLink>
          </div>
        </div>
      </nav>

      {/* ───────────────────────── hero ───────────────────────── */}
      <header id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-[-25%] top-[-45%] h-[95%] bg-[radial-gradient(58%_55%_at_50%_0%,rgba(255,171,51,0.14),transparent_70%)]" />
        {/* near-invisible request pulses drifting through the hero — the motif */}
        <PulseLine className="pointer-events-none absolute left-[-6%] top-[22%] h-8 w-[46%] opacity-[0.055]" />
        <PulseLine className="pointer-events-none absolute right-[-8%] top-[38%] h-8 w-[52%] opacity-[0.045]" />
        <div className="relative mx-auto grid max-w-[1160px] justify-items-center gap-7 px-6 pt-16 text-center sm:pt-24 md:pt-28">
          <span className="chip">
            <span className="blip" aria-hidden="true" />
            v0.1.0 · open source · Apache-2.0
          </span>
          <div>
            <h1 className="mx-auto max-w-[24ch] text-balance text-[clamp(31px,5.6vw,64px)] font-bold leading-[1.06] tracking-[-0.02em]">
              Run AWS Lambda, SQS and DynamoDB <em className="not-italic text-amber">locally</em> — without Docker
            </h1>
            <p className="mt-4 text-[clamp(16px,2.4vw,21px)] font-medium text-fg/90">
              The dev server AWS Lambda never had.
            </p>
            <PulseLine crop="mid" className="mx-auto mt-5 h-10 w-[min(400px,78%)]" />
          </div>
          <div className="flex flex-wrap justify-center gap-3.5">
            <TrackLink href="#get-started" event="cta_click" props={{ cta: "get-started", location: "hero" }} className="btn btn-primary btn-beat">
              Install pulse
            </TrackLink>
            <TrackLink href={GH} event="cta_click" props={{ cta: "github", location: "hero" }} className="btn btn-ghost">
              {GitHubIcon} Star on GitHub
            </TrackLink>
          </div>

          {/* the product IS the hero: real CLI, typed live */}
          <Terminal />

          {/* the request path, one line, always moving */}
          <div className="hidden w-full max-w-[880px] rounded-xl border border-edge/70 bg-panel/30 px-5 pb-3 pt-2.5 md:block">
            <p className="mb-2 text-center font-mono text-[11px] text-faint">
              edit · save · replay · deploy — never wait for Docker again
            </p>
            <FlowDiagram compact />
          </div>

          {/* numbers with a "compared to what" (measured, not marketed) */}
          <div className="grid w-full max-w-[880px] grid-cols-2 gap-3 lg:grid-cols-4" aria-label="performance, enforced by CI">
            {([
              [99, " ms", "engine ready", "containers: 10–30 s"],
              [17, " ms", "warm invoke", "no cold containers"],
              [50, " MB", "memory, app running", "Docker stacks: 2 GB+"],
              [0, "", "", ""],
            ] as [number, string, string, string][]).map(([n, s, l, c]) =>
              l ? (
                <div key={l} className="rounded-xl border border-edge bg-panel/50 px-4 py-3.5 text-center font-mono">
                  <CountUp to={n} suffix={s} className="text-[22px] font-bold tabular-nums text-amber" />
                  <span className="mt-0.5 block text-[12px] text-dim">{l}</span>
                  <span className="mt-2 block border-t border-edge/70 pt-1.5 text-[10.5px] text-faint">{c}</span>
                </div>
              ) : (
                <div key="zero" className="rounded-xl border border-edge bg-panel/50 px-4 py-3.5 text-center font-mono">
                  <b className="text-[22px] font-bold tabular-nums text-amber">$0</b>
                  <span className="mt-0.5 block text-[12px] text-dim">to learn & build</span>
                  <span className="mt-2 block border-t border-edge/70 pt-1.5 text-[10.5px] text-faint">no AWS account needed</span>
                </div>
              )
            )}
          </div>
          <TrackLink
            href={`${GH}/blob/master/internal/perf/perf_test.go`}
            event="outbound"
            props={{ target: "perf-ci" }}
            className="-mt-2 font-mono text-[12px] text-faint underline decoration-edge underline-offset-4 transition-colors hover:text-dim"
          >
            measured on every CI run — a slower pulse is a failed build ↗
          </TrackLink>
        </div>
      </header>

      {/* ─────────────────── works-with strip ─────────────────── */}
      <div className="mt-12 border-y border-edge bg-bg2/60 md:mt-18">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-center gap-x-3.5 gap-y-3 px-6 py-5">
          <span className="mr-2 font-mono text-[12.5px] text-faint">integrates with what you already use</span>
          {["boto3", "AWS SDK JS v3", "SAM · CDK · Serverless Framework deploys", "GitHub Actions", "macOS · Linux", "zsh · bash · fish"].map((t) => (
            <span key={t} className="chip !text-fg/85">{t}</span>
          ))}
        </div>
      </div>

      {/* SEO lede — what pulse is, in one crawlable paragraph */}
      <p className="mx-auto mt-14 max-w-[72ch] px-6 text-center text-[clamp(15px,2vw,17.5px)] leading-relaxed text-dim">
        pulse is a fast local serverless development environment: build and debug AWS Lambda
        functions with instant hot reload, real SQS queues, local DynamoDB tables, and event
        replay. It speaks the real AWS protocols, so your production code runs unchanged —
        no Docker, no AWS account, no mocks in your handlers.
      </p>

      <main className="mx-auto max-w-[1160px] px-6">
        {/* ───────── the switch: what you do today vs with pulse ───────── */}
        <section id="switch" className="pt-16 md:pt-20">
          <Reveal section="switch">
            <div className="mx-auto max-w-[900px]">
              <p className="text-center text-[15.5px] text-dim">
                Already using <b className="font-medium text-fg">LocalStack</b>,{" "}
                <b className="font-medium text-fg">sam local</b>, or a hand-rolled{" "}
                <b className="font-medium text-fg">docker-compose</b>? Here&apos;s the trade
                you&apos;re making today:
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-edge bg-bg2/60 p-5">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">your current loop</p>
                  <ul className="mt-3 space-y-2.5 text-[13.5px] leading-snug text-dim">
                    {[
                      "start Docker, pull GB images",
                      "wait 10–30 s for containers",
                      "hand-wire endpoints & env vars",
                      "restart after every change",
                      "lose the event that crashed it",
                    ].map((t) => (
                      <li key={t} className="flex gap-2"><span className="shrink-0 text-tred">✗</span>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber/30 bg-panel p-5">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-amber">the pulse loop</p>
                  <ul className="mt-3 space-y-2.5 text-[13.5px] leading-snug text-dim">
                    {[
                      "pulse start — one binary",
                      "ready in 99 ms",
                      "endpoints auto-configured",
                      "save a file — it's live",
                      "replay any event, byte for byte",
                    ].map((t) => (
                      <li key={t} className="flex gap-2"><span className="shrink-0 text-tgreen">✓</span>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─────────────── follow one request (signature) ─────────────── */}
        <section id="journey" className="pt-20 md:pt-32">
          <Reveal section="journey">
            <div className="max-w-[72ch]">
              <p className="kick mb-4">follow one request</p>
              <h2 className="text-balance text-[clamp(28px,4.5vw,44px)] font-bold leading-[1.08] tracking-tight">
                One order, end to end — entirely on your laptop
              </h2>
              <p className="mt-4 text-[clamp(16px,2.1vw,18.5px)] leading-relaxed text-dim">
                One request&apos;s whole lifecycle — every line below is real output.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 max-w-[780px]">
            {journey.map(([title, sub, snippet], i) => (
              <div key={title} className="grid grid-cols-[22px_1fr] gap-x-4 sm:gap-x-6">
                <div className="flex flex-col items-center">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-amber bg-bg shadow-[0_0_10px_rgba(255,171,51,0.5)]" />
                  {i < journey.length - 1 && (
                    <div className="vtrack my-1 w-0 flex-1">
                      <span className="vdot" style={{ animationDelay: `${i * 0.3}s` }} />
                    </div>
                  )}
                </div>
                <Reveal delay={Math.min(i * 50, 200)} className={i < journey.length - 1 ? "pb-7" : ""}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="text-[16px] font-semibold">{title}</h3>
                    <span className="font-mono text-[11.5px] text-faint">{sub}</span>
                  </div>
                  <pre
                    className="mt-2.5 overflow-x-auto rounded-lg border border-edge bg-bg2/80 px-4 py-2.5 font-mono text-[12.3px] leading-[1.7]"
                    dangerouslySetInnerHTML={{ __html: snippet }}
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────── features (bento) ───────────────────── */}
        <section id="features" className="pt-20 md:pt-32">
          <Reveal section="features">
            <SectionHead
              idx="01"
              kick="features"
              title="A local cloud that keeps up with your typing"
              lede="Fidelity from the real AWS protocols, speed from native processes — here's what that buys you every day."
            />
          </Reveal>

          <Spotlight className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {/* async loop — the differentiator */}
            <Reveal className="md:col-span-2 lg:col-span-7" delay={0}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">The async loop, actually local</h3>
                <p className="mt-2 max-w-[52ch] text-[14.5px] leading-relaxed text-dim">
                  Local SQS queues deliver to workers — visibility timeouts, retries, DLQs —
                  narrated live in your console.
                </p>
                <div className="mt-7 flex items-center gap-3 font-mono text-[12px]">
                  <span className="shrink-0 rounded-lg border border-edge bg-bg2 px-3 py-2 text-fg">POST /orders</span>
                  <div className="qtrack h-6 min-w-0 flex-1 border-b border-dashed border-edge2">
                    <span className="qdot" />
                    <span className="qdot" style={{ animationDelay: "1s" }} />
                    <span className="qdot" style={{ animationDelay: "2s" }} />
                  </div>
                  <span className="shrink-0 rounded-lg border border-edge bg-bg2 px-3 py-2 text-fg">
                    worker <span className="text-tgreen">✓</span>
                  </span>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11.5px] text-faint">
                  <span>visibility timeouts</span>
                  <span>automatic retries</span>
                  <span>
                    gave up? → <span className="text-tred">orders-dlq</span>
                  </span>
                </div>
              </div>
            </Reveal>

            {/* millisecond loop */}
            <Reveal className="lg:col-span-5" delay={70}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">Hot reload, measured in CI</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-dim">
                  Hot reload for AWS Lambda: save a file, the next request runs the new code.
                </p>
                <div className="cycle mt-5 space-y-1.5 font-mono text-[12px]">
                  <div className="flex items-center gap-2.5 rounded-lg border border-edge bg-bg px-3.5 py-2"><span className="text-amber">⌘S</span> handler.py saved</div>
                  <div className="flex items-center gap-2.5 rounded-lg border border-edge bg-bg px-3.5 py-2"><span className="text-amber">⟳</span> pulse hot-reloads the function</div>
                  <div className="flex items-center gap-2.5 rounded-lg border border-edge bg-bg px-3.5 py-2"><span className="text-tgreen">→</span> next request runs the new code</div>
                </div>
                <div className="mt-4 font-mono text-[12.5px] text-dim">
                  <CountUp to={17} suffix=" ms" className="font-bold text-amber" /> warm invoke · ready in 99 ms ·{" "}
                  <span className="text-faint">a slow pulse is a failed build</span>
                </div>
              </div>
            </Reveal>

            {/* time travel */}
            <Reveal className="lg:col-span-5" delay={0}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">Time travel debugging</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-dim">
                  Every trigger recorded byte-for-byte — replay yesterday&apos;s crash against
                  today&apos;s fix.
                </p>
                <div className="mt-5 space-y-1.5 font-mono text-[12px]">
                  <div className="flex items-center gap-3 rounded-lg border border-edge bg-bg px-3.5 py-2.5">
                    <span className="text-faint">yesterday</span>
                    <span className="truncate text-fg">sqs event → worker</span>
                    <span className="ml-auto shrink-0 text-tred">✗ error</span>
                  </div>
                  <div className="flex items-center gap-2 pl-3.5 text-[11.5px] text-faint">
                    <span className="text-amber">↻</span> pulse events replay 8931cf5b
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-tgreen/25 bg-bg px-3.5 py-2.5">
                    <span className="text-faint">today</span>
                    <span className="truncate text-fg">same event · fixed code</span>
                    <span className="ml-auto shrink-0 text-tgreen">✓ success</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* real protocols */}
            <Reveal className="md:col-span-2 lg:col-span-7" delay={70}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">Runs like AWS — because it speaks AWS</h3>
                <p className="mt-2 max-w-[54ch] text-[14.5px] leading-relaxed text-dim">
                  Plain AWS SDK in your handlers, one env var from pulse — nothing to delete
                  before you deploy.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {["Lambda Runtime API", "SQS wire protocol", "DynamoDB expressions"].map((p) => (
                    <span key={p} className="chip !text-fg/90">{p}</span>
                  ))}
                </div>
                <pre className="mt-5 overflow-x-auto rounded-lg border border-edge bg-bg px-4 py-3.5 font-mono text-[12.5px] leading-[1.8]">
                  <span className="text-faint"># handler.py — no pulse imports, no endpoint config</span>{"\n"}
                  <span className="text-tcyan">import</span> boto3{"\n"}
                  sqs = boto3.client(<span className="text-tgreen">&quot;sqs&quot;</span>){"\n"}
                  {"\n"}
                  <span className="text-faint"># local  → AWS_ENDPOINT_URL points at pulse (set for you)</span>{"\n"}
                  <span className="text-faint"># prod   → same code. no endpoint. talks to AWS.</span>
                </pre>
              </div>
            </Reveal>

            {/* persistent state */}
            <Reveal className="lg:col-span-4" delay={0}>
              <div className="bento h-full p-6.5">
                <h3 className="text-[17px] font-semibold">State that survives restarts</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  Local DynamoDB items, queues, history — SQLite under the hood. Free, by default.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[11px]">
                  <span className="rounded-md border border-edge bg-bg px-2 py-1 text-fg">PutItem</span>
                  <span className="text-faint">→</span>
                  <span className="rounded-md border border-edge bg-bg px-2 py-1 text-dim">.pulse/data</span>
                  <span className="text-faint">→</span>
                  <span className="rounded-md border border-edge bg-bg px-2 py-1 text-dim">restart ⟳</span>
                  <span className="text-faint">→</span>
                  <span className="rounded-md border border-tgreen/30 bg-bg px-2 py-1 text-tgreen">✓ still there</span>
                </div>
              </div>
            </Reveal>

            {/* CLI that teaches */}
            <Reveal className="lg:col-span-4" delay={70}>
              <div className="bento h-full p-6.5">
                <h3 className="text-[17px] font-semibold">A CLI that teaches</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  Run any command bare and it asks instead of erroring. Errors ship their fix.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-lg border border-edge bg-bg px-3.5 py-3 font-mono text-[12px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: pickerMini }} />
              </div>
            </Reveal>

            {/* one binary */}
            <Reveal className="md:col-span-2 lg:col-span-4" delay={140}>
              <div className="bento h-full p-6.5">
                <h3 className="text-[17px] font-semibold">One 20 MB binary</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  No Docker, no images, no daemons. Runs happily on battery.
                </p>
                <div className="mt-5 space-y-2.5 font-mono text-[11.5px]">
                  <div>
                    <div className="mb-1 flex justify-between text-faint"><span>pulse, app running</span><span className="text-amber">50 MB</span></div>
                    <div className="h-1.5 rounded-full bg-bg"><span className="bar bg-amber" style={{ "--w": "9%" } as React.CSSProperties} /></div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-faint"><span>a container stack</span><span>2 GB+</span></div>
                    <div className="h-1.5 rounded-full bg-bg"><span className="bar bg-edge2" style={{ "--w": "96%" } as React.CSSProperties} /></div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Spotlight>
          <LearnMore href={`${GUIDE}#3-build`} target="guide-features" label="Every feature, hands-on, in the guide" />

          <Reveal className="mt-6">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-2xl border border-edge bg-panel/40 px-6 py-5">
              <span className="font-mono text-[13px] text-dim">sold on the loop?</span>
              <TrackLink href="#get-started" event="cta_click" props={{ cta: "get-started", location: "features" }} className="btn btn-primary !py-2.5">
                Install pulse
              </TrackLink>
              <TrackLink href={`${GH}#two-minutes-to-a-running-app`} event="outbound" props={{ target: "quickstart-features" }} className="btn btn-ghost !py-2.5">
                2-minute quickstart
              </TrackLink>
            </div>
          </Reveal>
        </section>

        {/* ───────────────────── how it works ───────────────────── */}
        <section id="how" className="band pb-16 pt-20 md:pb-24 md:pt-32">
          <Reveal section="how">
            <SectionHead
              idx="02"
              kick="how it works"
              title="Empty directory to deployed, in five steps"
              lede="The complete journey — create, run, build, debug, ship. Every frame below is real output, not a mockup. Click a step or let it play."
            />
          </Reveal>
          <Reveal className="mt-12">
            <HowItWorks steps={steps} />
          </Reveal>
          <LearnMore href={`${GUIDE}#1-start-here`} target="guide-how" label="The full start-here walkthrough" />
        </section>

        {/* ───────────────────── inspect ───────────────────── */}
        <section id="inspect" className="pt-20 md:pt-32">
          <Reveal section="inspect">
            <SectionHead
              idx="03"
              kick="inspect"
              title="X-ray vision for your local cloud"
              lede="Logs are where debugging starts, not where it ends. pulse records everything and gives you four ways to debug your Lambda functions, queues, and tables locally."
            />
          </Reveal>
          <Reveal className="mt-12">
            <InspectTabs tabs={inspectTabs} />
          </Reveal>
          <LearnMore href={`${GUIDE}#4-inspect`} target="guide-inspect" label="All four views, step by step" />
        </section>

        {/* ───────────────────── why pulse ───────────────────── */}
        <section id="why" className="band pb-16 pt-20 md:pb-24 md:pt-32">
          <Reveal section="why">
            <SectionHead
              idx="04"
              kick="why pulse"
              title="Local serverless development is broken. Here's the fix."
            />
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <h3 className="text-[19px] font-semibold">Why pulse exists</h3>
              <div className="mt-3.5 space-y-4 text-[15px] leading-relaxed text-dim">
                <p className="text-[16px] text-fg/90">
                  Express has <em className="not-italic text-amber">nodemon</em>. Next has{" "}
                  <em className="not-italic text-amber">next dev</em>. Vite <i>is</i> the dev
                  server. Rails has <em className="not-italic text-amber">bin/dev</em>.
                </p>
                <p className="text-[16px] font-medium text-fg">AWS Lambda never got one.</p>
                <p className="text-[16px] font-semibold text-amber">pulse changes that.</p>
                <p>Serverless made deployment easy — and development weirdly hard. The workarounds:</p>
                <ul className="space-y-2 text-[14.5px]">
                  <li className="flex gap-2"><span className="shrink-0 text-tred">✗</span><span><b className="font-medium text-fg">Deploy to debug</b> — minutes per iteration, a real AWS bill per log line</span></li>
                  <li className="flex gap-2"><span className="shrink-0 text-tred">✗</span><span><b className="font-medium text-fg">Mock everything</b> — tests that pass against code that isn&apos;t real</span></li>
                  <li className="flex gap-2"><span className="shrink-0 text-tred">✗</span><span><b className="font-medium text-fg">Emulate in Docker</b> — GB images, slow containers, config drift</span></li>
                </ul>
              </div>

            </Reveal>

            <Reveal delay={80}>
              <h3 className="text-[19px] font-semibold">Why not Docker?</h3>
              <ul className="mt-3.5 space-y-2.5 text-[15px] leading-relaxed text-dim">
                <li><b className="font-medium text-fg">Startup.</b> Containers boot in tens of seconds; pulse is ready in ~99 ms.</li>
                <li><b className="font-medium text-fg">Memory.</b> Gigabytes idle vs ~50 MB for a whole app.</li>
                <li><b className="font-medium text-fg">Iteration.</b> Rebuild-and-restart vs save-and-it&apos;s-live.</li>
                <li><b className="font-medium text-fg">Fidelity.</b> pulse speaks the real Lambda Runtime API and SQS/DynamoDB wire protocols — the AWS SDK can&apos;t tell the difference.</li>
              </ul>

              {/* the boot moment, visualized: services come online in ~100 ms */}
              <div className="mt-7 rounded-xl border border-edge bg-panel/60 p-5">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">
                  pulse start — your local cloud coming online
                </p>
                <div className="mt-3.5 space-y-2.5 font-mono text-[12.5px]">
                  {([
                    ["gateway", "http · localhost:3000"],
                    ["functions", "Lambda Runtime API · Node + Python"],
                    ["queues", "SQS · retries · DLQs"],
                    ["tables", "DynamoDB · SQLite-backed"],
                  ] as [string, string][]).map(([name, sub]) => (
                    <div key={name} className="boot-row flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-tgreen shadow-[0_0_6px_rgba(122,219,143,0.7)]" />
                      <span className="text-fg">{name}</span>
                      <span className="ml-auto text-right text-[10.5px] text-faint">{sub}</span>
                    </div>
                  ))}
                  <div className="boot-row flex items-center gap-2.5 border-t border-edge pt-2.5">
                    <span className="blip" aria-hidden="true" />
                    <span className="font-bold text-amber">ready in 99 ms</span>
                    <span className="ml-auto text-[10.5px] text-faint">edits apply live</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* architecture, animated */}
          <Reveal className="mt-14">
            <h3 className="text-[19px] font-semibold">How it&apos;s put together</h3>
            <p className="mt-2 max-w-[70ch] text-[14.5px] leading-relaxed text-dim">
              One native process, one SQLite file — this is <code className="font-mono text-[13px] text-amber-soft">pulse start</code>:
            </p>
            <div className="mt-6 rounded-2xl border border-edge bg-panel/40 p-5 lg:p-6">
              <FlowDiagram />
            </div>
            <p className="mt-4 max-w-[72ch] text-[14px] leading-relaxed text-faint">
              HTTP becomes API Gateway events, handlers run on the real Runtime API, the SDK
              points at pulse through one env var, queues retry into DLQs, everything persists
              to disk.
            </p>
          </Reveal>
        </section>

        {/* ───────────────────── use cases ───────────────────── */}
        <section id="use-cases" className="pt-20 md:pt-32">
          <Reveal section="use-cases">
            <SectionHead
              idx="05"
              kick="use cases"
              title="What people build with pulse"
              lede="If it's Lambda + HTTP + SQS + DynamoDB, it runs locally — the whole loop, not a fragment of it."
            />
          </Reveal>
          <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map(([title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 70}>
                <div className="bento h-full p-6">
                  <h3 className="text-[16.5px] font-semibold">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-dim">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 font-mono text-[12.5px] text-faint">built for</span>
              {["backend engineers", "AWS developers", "platform teams", "startups", "indie hackers", "students learning AWS"].map((w) => (
                <span key={w} className="chip">{w}</span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ───────────────────── templates ───────────────────── */}
        <section id="templates" className="pt-20 md:pt-32">
          <Reveal section="templates">
            <SectionHead
              idx="06"
              kick="templates"
              title="A learning path, not a pile of boilerplate"
              lede="Each starter adds exactly one concept. All ship in Python and Node, use the plain AWS SDK, and run unchanged in real AWS."
            />
          </Reveal>
          <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map(([name, tag, body], i) => (
              <Reveal key={name} delay={i * 70}>
                <div className="bento h-full p-6">
                  <p className="font-mono text-[13px]">
                    <span className="text-faint">$ pulse init -t </span>
                    <b className="font-medium text-amber">{name}</b>
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-dim">{body}</p>
                  <p className="mt-4 font-mono text-[11.5px] text-faint">{tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <LearnMore href={`${GUIDE}#3-build`} target="guide-templates" label="What each template teaches" />
        </section>

        {/* ───────────────────── compare ───────────────────── */}
        <section id="compare" className="band pb-16 pt-20 md:pb-24 md:pt-32">
          <Reveal section="compare">
            <SectionHead
              idx="07"
              kick="compare"
              title="Built for the inner loop"
              lede="Searching for a LocalStack alternative, or wondering how pulse compares to sam local? Different tools do different jobs — here's the honest version."
            />
          </Reveal>
          {/* the gap, drawn to linear scale — the sliver is the point */}
          <Reveal className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bento p-6">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">cold start to working</p>
                <div className="mt-4 space-y-4 font-mono text-[12px]">
                  <div>
                    <div className="mb-1.5 flex justify-between"><span className="text-fg">pulse</span><b className="text-amber">99 ms</b></div>
                    <div className="h-2 rounded-full bg-bg"><span className="bar bg-amber shadow-[0_0_8px_rgba(255,171,51,0.5)]" style={{ "--w": "2%", minWidth: 5 } as React.CSSProperties} /></div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-dim"><span>container stacks</span><span>10–30 s</span></div>
                    <div className="h-2 rounded-full bg-bg"><span className="bar bg-edge2" style={{ "--w": "100%" } as React.CSSProperties} /></div>
                  </div>
                </div>
              </div>
              <div className="bento p-6">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">memory while developing</p>
                <div className="mt-4 space-y-4 font-mono text-[12px]">
                  <div>
                    <div className="mb-1.5 flex justify-between"><span className="text-fg">pulse</span><b className="text-amber">~50 MB</b></div>
                    <div className="h-2 rounded-full bg-bg"><span className="bar bg-amber shadow-[0_0_8px_rgba(255,171,51,0.5)]" style={{ "--w": "2.4%", minWidth: 5 } as React.CSSProperties} /></div>
                  </div>
                  <div>
                    <div className="mb-1.5 flex justify-between text-dim"><span>Docker stacks</span><span>2 GB+</span></div>
                    <div className="h-2 rounded-full bg-bg"><span className="bar bg-edge2" style={{ "--w": "100%" } as React.CSSProperties} /></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-faint">
              bars drawn to linear scale — the sliver is the point
            </p>
          </Reveal>

          <Reveal className="mt-8">
            <div className="overflow-x-auto rounded-2xl border border-edge">
              <table className="w-full min-w-[660px] border-collapse text-[14.5px] tabular-nums">
                <thead>
                  <tr className="bg-panel text-dim">
                    <th className="px-5 py-3.5 text-left font-medium"></th>
                    <th className="border-x border-amber/15 bg-[rgba(255,171,51,0.07)] px-5 py-3.5 text-left font-semibold text-amber">pulse</th>
                    <th className="px-5 py-3.5 text-left font-medium">sam local</th>
                    <th className="px-5 py-3.5 text-left font-medium">LocalStack</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row[0]} className="transition-colors hover:bg-white/[0.02]">
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{row[0]}</td>
                      <td className="border-t border-edge border-x border-amber/15 bg-[rgba(255,171,51,0.05)] px-5 py-3.5 font-medium">
                        {row[1].startsWith("✓") ? (<><span className="text-tgreen">✓</span>{row[1].slice(1)}</>) : row[1]}
                      </td>
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{gap(row[2])}</td>
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{gap(row[3])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-6 max-w-[68ch] text-[15.5px] leading-relaxed text-dim">
            Different tools for different jobs. LocalStack emulates ~100 services and tests your
            infrastructure code; SAM deploys. pulse owns the five hundred iterations before staging —
            and pairs with either at deploy time, because your code is vanilla SDK throughout.
          </p>
          <Reveal>
            <div className="mt-9 max-w-[68ch] rounded-r-xl border-l-[3px] border-amber bg-panel/50 py-4 pl-6 pr-5 text-dim">
              <b className="text-fg">Honesty by design.</b> pulse does one workflow completely — CRUD
              APIs with background jobs (HTTP, SQS, DynamoDB, Lambda). Everything outside that subset
              fails loudly with a message saying exactly what isn&apos;t supported. Never silently
              wrong. S3, SNS, EventBridge, Step Functions: on the roadmap, not pretended.
            </div>
          </Reveal>

          {/* support matrix */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="bento h-full p-6.5">
                <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-tgreen">Works today</h3>
                <ul className="mt-4 space-y-2 text-[14.5px] text-dim">
                  {[
                    "AWS Lambda functions — Node.js & Python, real Runtime API",
                    "HTTP APIs — API Gateway v1/v2 events, {param} & {proxy+} routes",
                    "SQS queues — visibility timeouts, retries, dead-letter queues",
                    "DynamoDB — CRUD, Query/Scan, condition & update expressions",
                    "Hot reload for code and pulse.yaml",
                    "Event replay, request stories, live monitor, tables browser",
                    "SQLite persistence across restarts",
                  ].map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-px shrink-0 text-tgreen">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="bento h-full p-6.5">
                <h3 className="font-mono text-[13px] uppercase tracking-[0.14em] text-dim">On the roadmap</h3>
                <ul className="mt-4 space-y-2 text-[14.5px] text-dim">
                  {["S3 buckets", "SNS topics", "EventBridge rules", "Step Functions"].map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-px shrink-0 text-faint">○</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-edge pt-4 text-[13.5px] leading-relaxed text-faint">
                  Until then, touching an unsupported service fails loudly with a clear message —
                  pulse never silently fakes a response it can&apos;t honor.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-2xl border border-edge bg-panel/40 px-6 py-5">
              <span className="font-mono text-[13px] text-dim">the inner loop is yours</span>
              <TrackLink href="#get-started" event="cta_click" props={{ cta: "get-started", location: "compare" }} className="btn btn-primary !py-2.5">
                Install pulse
              </TrackLink>
              <TrackLink href={GH} event="cta_click" props={{ cta: "github", location: "compare" }} className="btn btn-ghost !py-2.5">
                {GitHubIcon} Star on GitHub
              </TrackLink>
            </div>
          </Reveal>

          <p className="mt-6 text-center font-mono text-[13px] text-dim">
            deep dives:{" "}
            <a className="text-amber transition-colors hover:text-amber-soft" href="/vs/localstack">pulse vs LocalStack →</a>
            {"  ·  "}
            <a className="text-amber transition-colors hover:text-amber-soft" href="/vs/sam-local">pulse vs sam local →</a>
          </p>
        </section>

        {/* ───────────────────── FAQ ───────────────────── */}
        <section id="faq" className="pt-20 md:pt-32">
          <Reveal section="faq">
            <SectionHead
              idx="08"
              kick="faq"
              title="Questions people actually ask"
            />
          </Reveal>
          <Reveal className="faq mt-10 max-w-[860px]">
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p className="a">{a}</p>
              </details>
            ))}
          </Reveal>
        </section>

        {/* ───────────────────── testimonials ───────────────────── */}
        {SHOW_TESTIMONIALS && (
          <section id="testimonials" className="pt-20 md:pt-32">
            <Reveal section="testimonials">
              <SectionHead idx="09" kick="early signal" title="What early users say" />
            </Reveal>
            <div className="mt-11 grid grid-cols-1 gap-4 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.role} delay={i * 70}>
                  <figure className="bento flex h-full flex-col p-6.5">
                    <PulseLine crop="tight" className="h-4 w-8 opacity-70" />
                    <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg/90">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-5 border-t border-edge pt-4 font-mono text-[12px] text-dim">
                      {t.role} <span className="text-faint">· {t.org}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-5">
              <TrackLink
                href={`${GH}/issues/new`}
                event="outbound"
                props={{ target: "share-feedback" }}
                className="group flex items-center justify-between rounded-2xl border border-dashed border-edge px-6.5 py-5 transition-colors hover:border-amber/40"
              >
                <span className="text-[15px] text-dim transition-colors group-hover:text-fg">
                  Using pulse? Tell us what clicked — and what broke.
                </span>
                <span className="font-mono text-[13px] text-amber">open an issue ↗</span>
              </TrackLink>
            </Reveal>
          </section>
        )}

        {/* ───────────────────── CTA ───────────────────── */}
        <section id="get-started" className="pt-20 md:pt-32">
          <Reveal section="get-started">
            <div className="relative overflow-hidden rounded-3xl border border-edge bg-gradient-to-b from-panel to-bg2 px-5 py-12 text-center md:px-7 md:py-16">
              <PulseLine className="pointer-events-none absolute left-1/2 top-9 h-8 w-[720px] -translate-x-1/2 opacity-25" />
              <div className="relative">
                <p className="kick mb-4">get started</p>
                <h2 className="text-balance text-[clamp(28px,4.5vw,44px)] font-bold tracking-tight">
                  Your local cloud, one command away
                </h2>
                <p className="mx-auto mt-4 max-w-[44ch] text-balance text-[15.5px] leading-relaxed text-dim">
                  Every modern framework has a dev server.
                  <span className="block font-medium text-fg">AWS Lambda finally has one.</span>
                </p>
                <div className="mt-8 flex justify-center">
                  <InstallTabs location="cta" />
                </div>
                <p className="mt-6 text-[14.5px] text-dim">
                  then run <code className="font-mono text-[13.5px] text-amber">pulse tour</code> — five minutes, hands-on, nothing simulated
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3.5">
                  <TrackLink href={`${GH}#two-minutes-to-a-running-app`} event="outbound" props={{ target: "quickstart-cta" }} className="btn btn-ghost">
                    2-minute quickstart
                  </TrackLink>
                  <TrackLink href={`${GH}/blob/master/docs/GUIDE.md`} event="outbound" props={{ target: "guide-cta" }} className="btn btn-ghost">
                    Read the guide
                  </TrackLink>
                  <TrackLink href={GH} event="cta_click" props={{ cta: "github", location: "cta" }} className="btn btn-ghost">
                    {GitHubIcon} GitHub
                  </TrackLink>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ───────────────────── footer ───────────────────── */}
      <footer className="mt-20 border-t border-edge bg-bg2/70 md:mt-28">
        <div className="mx-auto grid max-w-[1160px] grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          <div>
            <span className="flex items-center gap-2.5 text-[17px] font-bold text-fg">
              <PulseLine crop="tight" className="h-6 w-11" />
              pulse
            </span>
            <p className="mt-3.5 max-w-[34ch] text-sm leading-relaxed text-dim">
              The dev server AWS Lambda never had. Run the whole app locally, in milliseconds.
            </p>
            <TrackLink href={`${GH}/releases`} event="outbound" props={{ target: "releases-footer" }} className="chip mt-4">
              v0.1.0 · changelog
            </TrackLink>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">{col.title}</h3>
              {col.links.map(([label, href]) => (
                <TrackLink key={label} href={href} event="outbound" props={{ target: label.toLowerCase().replace(/\s/g, "-") }}
                  className="my-2 block text-[14.5px] text-fg/85 transition-colors hover:text-amber">
                  {label}
                </TrackLink>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1160px] flex-wrap gap-5 border-t border-edge px-6 py-5 pb-7 text-[13px] text-faint">
          <span>Apache-2.0 © Geetansh Garg</span>
          <span>Not affiliated with Amazon Web Services. AWS, Lambda, SQS, and DynamoDB are trademarks of Amazon.com, Inc.</span>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════ content data ═══════════════════════
   Every terminal frame below is verbatim output from the real CLI
   (captured in docs/GUIDE.md and live sessions) — nothing invented. */

const steps: Step[] = [
  {
    id: "init",
    cmd: "pulse init",
    title: "Create a project",
    blurb: "Three questions — or script it with flags. Working sample code, dependencies installed for you.",
    frame:
      '<span class="text-amber">$ pulse init</span>\n<span class="text-dim">? project name › </span>shop\n<span class="text-dim">? template     › </span>api-and-worker ★ <span class="text-dim">— api + queue + worker + table</span>\n<span class="text-dim">? language     › </span>python\n\n<span class="text-tgreen">✓</span> created project <b>shop</b> <span class="text-dim">from template api-and-worker (python)</span>\n  <span class="text-tgreen">✓</span> <span class="text-dim">installing python dependencies — done (6.6s)</span>',
  },
  {
    id: "start",
    cmd: "pulse start",
    title: "Start your local cloud",
    blurb: "Routes answer, queues deliver, tables exist — in under 100 ms.",
    frame:
      '<span class="text-amber">$ pulse start</span>\n<span class="text-amber">⚡ pulse</span> <span class="text-dim">0.1.0 —</span> <b>shop</b>\n  <span class="text-dim">api</span>        http://localhost:3000\n  <span class="text-dim">routes</span>     <b>POST</b> /orders <span class="text-dim">→</span> <span class="text-tcyan">createOrder</span>\n  <span class="text-dim">try</span>        <span class="text-amber">curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'</span>\n\n<span class="text-tgreen">ready in 99ms</span> <span class="text-dim">— edits apply live</span>',
  },
  {
    id: "loop",
    cmd: "curl → queue → worker",
    title: "Build like it's a web app",
    blurb: "Save a file — the next request runs the new code.",
    frame:
      '<span class="text-amber">$ curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'</span>\n<span class="text-dim">201</span> {"id":"e9b4…","status":"pending"}\n  <span class="text-tcyan">⚙ sqs order-events → worker · ok</span>\n<span class="text-amber">🎉 first background job processed — your async loop works end to end</span>\n\n<span class="text-amber">$ curl localhost:3000/orders/e9b4…</span>\n{"id":"e9b4…","status":<span class="text-tgreen">"processed"</span>}   <span class="text-dim">← the worker got there first</span>',
  },
  {
    id: "replay",
    cmd: "pulse events replay",
    title: "Debug with time travel",
    blurb: "Every trigger is recorded byte for byte. Read one request's whole story, fix the handler, replay the actual event.",
    frame:
      '<span class="text-amber">$ pulse logs --request d90e5295</span>\n<span class="text-amber">⚡ request</span> <b>d90e5295</b>  <span class="text-tcyan">sqs</span> <span class="text-dim">→</span> processWebhook · <span class="text-tred">error</span> <span class="text-dim">· 2ms</span>\n<span class="text-amber">error</span>   <span class="text-tred">RuntimeError: webhook 3625d493 failed on purpose (attempt 3)</span>\n\n<span class="text-dim"># fix the handler, then fire the exact same payload:</span>\n<span class="text-amber">$ pulse events replay d90e5295</span>\n<span class="text-tgreen">✓ processWebhook · success · 0ms</span>  <span class="text-dim">← same event, fixed code</span>',
  },
  {
    id: "deploy",
    cmd: "sam deploy · cdk deploy",
    title: "Deploy unchanged",
    blurb: "pulse is dev-time only. Your handlers are plain AWS SDK code — ship them with SAM, CDK, or the Serverless Framework.",
    frame:
      '<span class="text-amber">$ sam deploy</span>   <span class="text-dim"># or: cdk deploy · serverless deploy</span>\n\n<span class="text-dim"># nothing to remove before shipping:</span>\n<span class="text-dim">#</span>   handlers   <span class="text-tgreen">✓</span> plain boto3 / AWS SDK v3\n<span class="text-dim">#</span>   config     <span class="text-tgreen">✓</span> no pulse imports anywhere\n<span class="text-dim">#</span>   endpoints  <span class="text-tgreen">✓</span> AWS_ENDPOINT_URL simply absent in prod\n\n<span class="text-dim">the code you iterated on locally is the code that ships.</span>',
  },
];

const inspectTabs: InspectTab[] = [
  {
    id: "story",
    label: "request story",
    cmd: "pulse logs --request d90e5295",
    caption:
      "One id, the whole story: the exact payload that arrived, everything the function printed, how it ended — and the command to re-run it.",
    frame:
      '<span class="text-amber">$ pulse logs --request d90e5295</span>\n<span class="text-amber">⚡ request</span> <b>d90e5295</b>  <span class="text-tcyan">sqs</span> <span class="text-dim">→</span> processWebhook · <span class="text-tred">error</span> <span class="text-dim">· 2ms · 00:08</span>\n\n<span class="text-amber">event</span>\n  {\n    "Records": [\n      { <span class="text-dim">…the exact payload that arrived, pretty-printed…</span> }\n  <span class="text-dim">… 6 more line(s)</span>\n\n<span class="text-amber">logs</span>\n  <span class="text-dim">00:08:15.903  stderr</span>  Traceback (most recent call last): …\n\n<span class="text-amber">error</span>\n  <span class="text-tred">RuntimeError: webhook 3625d493 failed on purpose (attempt 3)</span>\n\n<span class="text-dim">re-run it against your current code:</span> <span class="text-amber">pulse events replay d90e5295</span>',
  },
  {
    id: "replay",
    label: "history & replay",
    cmd: "pulse events",
    caption:
      "Every trigger ever recorded, byte for byte. Fix the handler, replay yesterday's actual crash, watch it pass — no reconstructing inputs from log fragments.",
    frame:
      '<span class="text-amber">$ pulse events</span>\n  <b>8931cf5b</b>  <span class="text-dim">Aug  5 01:01</span>   sqs    <span class="text-dim">→</span> processWebhook · <span class="text-tred">error</span>   <span class="text-dim">· 1ms</span>\n  <b>7275f6ee</b>  <span class="text-dim">Aug  5 01:01</span>   http   <span class="text-dim">→</span> receiveWebhook · <span class="text-tgreen">success</span> <span class="text-dim">· 1ms</span>\n\n<span class="text-dim">replay any: pulse events replay &lt;id&gt; · narrow: --function &lt;fn&gt;</span>\n\n<span class="text-amber">$ pulse events replay 8931cf5b</span>\n<span class="text-tgreen">✓ processWebhook · success · 0ms</span>  <span class="text-dim">← same payload, fixed code</span>',
  },
  {
    id: "monitor",
    label: "live monitor",
    cmd: "pulse monitor",
    caption:
      "The full-screen cockpit: ✓ counts per function, live queue depths, streaming logs, and Enter replays the selected event. This is a real, unretouched screenshot.",
    frame:
      '<img src="/monitor.png" alt="pulse monitor — live function success counts, queue depths, streaming logs, and replayable events" style="width:100%;display:block;border-radius:8px" />',
  },
  {
    id: "tables",
    label: "tables & queues",
    cmd: "pulse tables · pulse peek",
    caption:
      "No aws-cli, no console tab. Browse table items decoded for humans; peek at waiting messages without consuming them.",
    frame:
      '<span class="text-amber">$ pulse tables orders</span>\n<b>orders</b> <span class="text-dim">— 2 item(s) shown</span>\n  <b>e9b4e51a-…</b>  <span class="text-dim">createdAt="…" ·</span> qty="2" · sku="A1" · status=<span class="text-tgreen">"processed"</span>\n  <b>parked-1</b>    <span class="text-dim">processedAt="…" ·</span> status=<span class="text-tgreen">"processed"</span>\n\n<span class="text-amber">$ pulse peek order-events</span>\n<b>order-events</b> <span class="text-dim">— 1 message(s), oldest first (peeking doesn\'t consume)</span>\n  <b>473b4539</b>  <span class="text-tgreen">visible</span>  {"id":"parked-1"}',
  },
];

const pickerMini =
  '<span class="text-amber">$ pulse invoke</span>\n<span class="text-dim">? which function ›</span>\n<span class="text-amber">▸ createOrder</span>\n  <span class="text-dim">worker</span>';

const templates: [string, string, string][] = [
  ["hello", "your first function", "One function behind GET /hello — the smallest possible start."],
  ["todo-api", "+ a real table", "Real CRUD on one DynamoDB table: create, list, complete, delete."],
  ["webhook-relay", "+ a queue & DLQ", "Ack-fast webhooks with retries and a dead-letter queue."],
  ["api-and-worker ★", "everything together", "The full loop: API + queue + worker + table, wired and narrated."],
];

const compare: [string, string, string, string][] = [
  ["Cold start to working", "~100 ms", "container per invoke", "10–30 s container"],
  ["Code change", "save → done", "mostly re-invoke", "redeploy / config"],
  ["Queue → worker → DLQ locally", "✓ out of the box", "not available", "via deploy cycle"],
  ["Event replay & request stories", "✓ built in", "—", "—"],
  ["Requirements", "one 20 MB binary", "Docker", "Docker, GB-scale image"],
  ["Typical memory while developing", "~50 MB", "100s of MB (containers)", "GBs (Docker image)"],
  ["Data persists across restarts", "✓ free, default", "n/a", "paid tier"],
];

// ⚠️ PLACEHOLDERS — swap in real quotes (name + permission) before launch,
// or set SHOW_TESTIMONIALS = false at the top of this file.
const testimonials = [
  {
    quote:
      "Deleted a 400-line docker-compose the same afternoon. The queue → worker → DLQ loop just runs — on battery, on a train.",
    role: "Backend engineer",
    org: "fintech startup",
  },
  {
    quote:
      "pulse tour is the best five minutes of CLI onboarding I've seen. Sent it to the whole team; everyone's local env finally matches.",
    role: "Platform lead",
    org: "B2B SaaS",
  },
  {
    quote:
      "Replaying yesterday's crashing payload against today's fix — byte for byte — changed how I debug Lambdas. I don't guess anymore.",
    role: "Solo founder",
    org: "indie AWS shop",
  },
];

// The signature walkthrough: [stage, qualifier, real output line(s)].
const journey: [string, string, string][] = [
  ["A request arrives", "plain HTTP · port 3000",
    '<span class="text-amber">$ curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'</span>'],
  ["The gateway shapes it", "an API Gateway v2 event — exactly like production",
    '<span class="text-dim">{"routeKey":"POST /orders","body":"{\\"sku\\":\\"A1\\",\\"qty\\":2}", …}</span>'],
  ["Your Lambda handler runs", "real Runtime API · hot-reloaded code",
    '<span class="text-dim">201</span> {"id":"e9b4…","status":"pending"}'],
  ["It queues a background job", "local SQS · real wire protocol",
    '<span class="text-tcyan">⚙ sqs order-events → worker · ok</span>'],
  ["The worker processes it", "visibility timeouts · retries · DLQ if it keeps failing",
    'worker <span class="text-dim">|</span> processed  <span class="text-dim">→ status:</span> <span class="text-tgreen">"processed"</span>'],
  ["Everything was recorded", "payload, logs, outcome — byte for byte",
    '  <b>7275f6ee</b>  <span class="text-dim">Aug  5 01:01</span>   http   <span class="text-dim">→</span> createOrder · <span class="text-tgreen">success</span> <span class="text-dim">· 1ms</span>'],
  ["So you can time travel", "the exact payload, against your current code",
    '<span class="text-amber">$ pulse events replay 7275f6ee</span>\n<span class="text-tgreen">✓ createOrder · success · 0ms</span>'],
  ["Then ship it, unchanged", "pulse is dev-time only",
    '<span class="text-amber">$ sam deploy</span>   <span class="text-dim"># the code that ran here is the code that ships</span>'],
];

const useCases: [string, string][] = [
  ["REST APIs on Lambda", "Routes hit real Lambda handlers, hot reload on every save."],
  ["Webhook receivers", "Ack fast, retry async — then replay the exact delivery that failed."],
  ["Background jobs & queue workers", "The full SQS → worker → DLQ loop, running on your machine."],
  ["Event-driven systems", "Chain functions through queues; every event keeps its story."],
  ["Learning AWS serverless", "No account, no bill — four templates from first function to full app."],
  ["Prototyping", "Build offline on a plane; deploy the same code with SAM or CDK."],
];

// Rendered as the FAQ accordions AND serialized into FAQPage JSON-LD below.
const faqs: [string, string][] = [
  ["Can I run AWS Lambda locally with pulse?", "Yes. pulse runs your Lambda functions natively on your machine against the real Lambda Runtime API — the same contract AWS uses in production. Node.js and Python are supported, no Docker is required, and the engine is ready in about 100 milliseconds."],
  ["Is pulse a LocalStack alternative?", "For the inner development loop, yes. LocalStack emulates ~100 AWS services inside Docker and shines at testing infrastructure code. pulse does one workflow completely — Lambda, HTTP, SQS, DynamoDB — natively, in milliseconds, with dev-server ergonomics: hot reload, event replay, a live monitor. Many teams build with pulse and verify infra with LocalStack or a staging account."],
  ["Does pulse replace sam local?", "They do different jobs. sam local spins up a container per invocation and can't run the queue → worker → dead-letter-queue loop continuously. pulse runs your whole app as a long-lived local cloud. Your deploy pipeline keeps using SAM (or CDK) — pulse never touches it."],
  ["Does pulse require Docker?", "No. pulse is one ~20 MB binary that runs your functions as native processes. A complete app idles around 50 MB of memory — no images to pull, no containers to boot."],
  ["Does pulse work with boto3 and the AWS SDK?", "Yes. Handlers use the plain AWS SDK — boto3 in Python, AWS SDK for JavaScript v3 in Node. pulse sets AWS_ENDPOINT_URL for your functions automatically, so the same code talks to pulse locally and to real AWS in production."],
  ["Which languages does pulse support?", "Node.js and Python today. Every template ships in both, and handlers are plain SDK code with no pulse imports to remove later."],
  ["Does pulse work offline?", "Yes. Functions, queues, tables, and event history all live on your machine in SQLite. Build on a plane — no AWS account needed."],
  ["Can I debug SQS queues locally?", "Yes. pulse runs local SQS queues with visibility timeouts, automatic retries, and dead-letter queues. Peek at waiting messages without consuming them, watch deliveries live, and replay the exact event that failed."],
  ["Does my data survive restarts?", "Yes. DynamoDB items, queued messages, and event history persist in .pulse/data (SQLite). Stop the engine, restart tomorrow — everything is still there, free, by default."],
  ["How do I deploy an app built with pulse?", "With whatever you already use — SAM, CDK, or the Serverless Framework. pulse is development-time only and your code is vanilla AWS SDK throughout, so there is nothing to strip out before deploying."],
];

const appLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "pulse",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  softwareVersion: "0.1.0",
  description:
    "Run AWS Lambda, SQS and DynamoDB locally without Docker. pulse is a fast local serverless development environment with hot reload, event replay, queues and workers.",
  url: "https://getpulse.run",
  image: "https://getpulse.run/opengraph-image.png",
  downloadUrl: `${GH}/releases`,
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Geetansh Garg", url: GH },
  sameAs: [GH],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const footerCols = [
  { title: "Product", links: [["Features", "#features"], ["vs LocalStack", "/vs/localstack"], ["vs sam local", "/vs/sam-local"], ["Changelog", `${GH}/releases`], ["Roadmap", `${GH}/blob/master/PLAN.md`]] as [string, string][] },
  { title: "Docs", links: [["The guide", GUIDE], ["Quickstart", `${GH}#two-minutes-to-a-running-app`], ["Templates", `${GUIDE}#3-build`], ["Cheat sheet", `${GUIDE}#7-command-cheat-sheet`]] as [string, string][] },
  { title: "Community", links: [["GitHub", GH], ["Issues", `${GH}/issues`], ["Share feedback", `${GH}/issues/new`]] as [string, string][] },
];
