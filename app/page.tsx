import { Terminal } from "@/components/terminal";
import { TrackLink, Reveal } from "@/components/interactive";
import { InstallTabs } from "@/components/install-tabs";
import { HowItWorks, type Step } from "@/components/how-it-works";
import { InspectTabs, type InspectTab } from "@/components/inspect-tabs";
import { PulseLine } from "@/components/pulse-line";
import { Spotlight, CountUp } from "@/components/fx";

const GH = "https://github.com/geetnsh2k1/pulse";

// ⚠️ PLACEHOLDER QUOTES below (see `testimonials`). Replace them with real
// ones — or flip this to false — before sharing the site publicly.
const SHOW_TESTIMONIALS = true;

const wave = ` ─╮ ╭─╮ ╭──\n  ╰─╯ ╰─╯`;

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

const GitHubIcon = (
  <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export default function Page() {
  return (
    <>
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
        <div className="relative mx-auto grid max-w-[1160px] justify-items-center gap-7 px-6 pt-16 text-center sm:pt-24 md:pt-28">
          <span className="chip">
            <span className="blip" aria-hidden="true" />
            v0.1.0 · open source · Apache-2.0
          </span>
          <div>
            <h1 className="mx-auto max-w-[19ch] text-balance text-[clamp(36px,7vw,78px)] font-bold leading-[1.02] tracking-[-0.025em]">
              The missing <em className="not-italic text-amber">dev server</em> for AWS serverless
            </h1>
            <PulseLine crop="mid" className="mx-auto mt-5 h-10 w-[min(400px,78%)]" />
          </div>
          <p className="max-w-[62ch] text-balance text-[clamp(16px,2.2vw,19px)] leading-relaxed text-dim">
            Every stack has one — Rails, Vite, Next. Serverless never did. pulse runs your whole
            app — API, queues, workers, DynamoDB — natively on your laptop. No Docker. No AWS
            account. Vanilla SDK code that deploys unchanged.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <TrackLink href="#get-started" event="cta_click" props={{ cta: "get-started", location: "hero" }} className="btn btn-primary">
              Install pulse
            </TrackLink>
            <TrackLink href={GH} event="cta_click" props={{ cta: "github", location: "hero" }} className="btn btn-ghost">
              {GitHubIcon} Star on GitHub
            </TrackLink>
          </div>

          <div className="mt-4 flex flex-wrap items-start justify-center gap-x-12 gap-y-4" aria-label="performance, enforced by CI">
            {([
              [99, " ms", "engine ready"],
              [17, " ms", "warm invoke"],
              [50, " MB", "memory, app running"],
            ] as [number, string, string][]).map(([n, s, l]) => (
              <div key={l} className="font-mono">
                <CountUp to={n} suffix={s} className="text-[23px] font-bold tabular-nums text-amber" />
                <span className="mt-0.5 block text-[12.5px] text-dim">{l}</span>
              </div>
            ))}
            <div className="font-mono">
              <b className="text-[23px] font-bold tabular-nums text-amber">$0</b>
              <span className="mt-0.5 block text-[12.5px] text-dim">no AWS bill to learn</span>
            </div>
          </div>
          <TrackLink
            href={`${GH}/blob/master/internal/perf/perf_test.go`}
            event="outbound"
            props={{ target: "perf-ci" }}
            className="-mt-3 font-mono text-[12px] text-faint underline decoration-edge underline-offset-4 transition-colors hover:text-dim"
          >
            not marketing numbers — CI fails if these regress ↗
          </TrackLink>

          <Terminal />
        </div>
      </header>

      {/* ─────────────────── works-with strip ─────────────────── */}
      <div className="mt-12 border-y border-edge bg-bg2/60 md:mt-18">
        <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-center gap-x-3.5 gap-y-3 px-6 py-5">
          <span className="mr-2 font-mono text-[12.5px] text-faint">works with what you already use</span>
          {["boto3", "AWS SDK JS v3", "SAM / CDK deploys", "GitHub Actions", "zsh · bash · fish"].map((t) => (
            <span key={t} className="chip !text-fg/85">{t}</span>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1160px] px-6">
        {/* ───────────────────── features (bento) ───────────────────── */}
        <section id="features" className="pt-20 md:pt-28">
          <Reveal section="features">
            <SectionHead
              idx="01"
              kick="features"
              title="A local cloud that keeps up with your typing"
              lede="pulse implements AWS's real Lambda Runtime API and speaks the real SQS and DynamoDB wire protocols — fidelity by construction, speed from native processes instead of containers."
            />
          </Reveal>

          <Spotlight className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {/* async loop — the differentiator */}
            <Reveal className="md:col-span-2 lg:col-span-7" delay={0}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">The async loop, actually local</h3>
                <p className="mt-2 max-w-[52ch] text-[14.5px] leading-relaxed text-dim">
                  Queues deliver to workers with visibility timeouts, automatic retries, and
                  dead-letter queues — the part <code className="font-mono text-[13px] text-amber-soft">sam local</code> can&apos;t
                  run at all — narrated live in one console.
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
                <h3 className="text-[18px] font-semibold">Milliseconds, enforced by CI</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-dim">
                  Save a file — the next request runs the new code. Restarts don&apos;t exist:
                  code and <code className="font-mono text-[13px] text-amber-soft">pulse.yaml</code> apply live.
                </p>
                <div className="mt-6 font-mono">
                  <CountUp to={17} suffix=" ms" className="text-[44px] font-bold leading-none tracking-tight text-amber" />
                  <div className="mt-1.5 text-[12.5px] text-dim">warm invoke · engine ready in 99 ms</div>
                  <div className="mt-4 border-t border-edge pt-3 text-[11.5px] text-faint">
                    every commit runs these as tests — a slow pulse is a failed build
                  </div>
                </div>
              </div>
            </Reveal>

            {/* time travel */}
            <Reveal className="lg:col-span-5" delay={0}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">Time travel debugging</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-dim">
                  Every trigger is recorded with its exact payload. Yesterday&apos;s crash, today&apos;s
                  fix, the <em className="not-italic text-fg">actual</em> event — replayed byte for byte.
                </p>
                <pre className="mt-5 overflow-x-auto rounded-lg border border-edge bg-bg px-4 py-3.5 font-mono text-[12.5px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: replayMini }} />
              </div>
            </Reveal>

            {/* real protocols */}
            <Reveal className="md:col-span-2 lg:col-span-7" delay={70}>
              <div className="bento h-full p-7">
                <h3 className="text-[18px] font-semibold">Real protocols, not lookalikes</h3>
                <p className="mt-2 max-w-[54ch] text-[14.5px] leading-relaxed text-dim">
                  Your handlers call the plain AWS SDK. pulse points it at itself with one
                  environment variable — so the code you iterate on locally is the code you
                  deploy, with nothing to delete.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {["Lambda Runtime API", "SQS wire protocol", "DynamoDB expressions"].map((p) => (
                    <span key={p} className="chip !text-fg/90">{p}</span>
                  ))}
                </div>
                <p className="mt-4 font-mono text-[12px] text-faint">
                  AWS_ENDPOINT_URL=<span className="text-dim">…</span> <span className="text-faint"># set for you by pulse start</span>
                </p>
              </div>
            </Reveal>

            {/* persistent state */}
            <Reveal className="lg:col-span-4" delay={0}>
              <div className="bento h-full p-6.5">
                <h3 className="text-[17px] font-semibold">State that survives restarts</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-dim">
                  Table items, queued messages, event history — all in SQLite. Kill the engine,
                  restart tomorrow: still there. Free, by default.
                </p>
                <p className="mt-4 font-mono text-[12px] text-faint">.pulse/data · SQLite</p>
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
        </section>

        {/* ───────────────────── how it works ───────────────────── */}
        <section id="how" className="pt-20 md:pt-28">
          <Reveal section="how">
            <SectionHead
              idx="02"
              kick="how it works"
              title="Zero to a running serverless app in two minutes"
              lede="Three commands. The frames below are real output, not mockups — click a step or let it play."
            />
          </Reveal>
          <Reveal className="mt-12">
            <HowItWorks steps={steps} />
          </Reveal>
        </section>

        {/* ───────────────────── inspect ───────────────────── */}
        <section id="inspect" className="pt-20 md:pt-28">
          <Reveal section="inspect">
            <SectionHead
              idx="03"
              kick="inspect"
              title="X-ray vision for your local cloud"
              lede="Logs are where debugging starts, not where it ends. pulse records everything that happens and gives you four ways to look at it."
            />
          </Reveal>
          <Reveal className="mt-12">
            <InspectTabs tabs={inspectTabs} />
          </Reveal>
        </section>

        {/* ───────────────────── templates ───────────────────── */}
        <section id="templates" className="pt-20 md:pt-28">
          <Reveal section="templates">
            <SectionHead
              idx="04"
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
        </section>

        {/* ───────────────────── compare ───────────────────── */}
        <section id="compare" className="pt-20 md:pt-28">
          <Reveal section="compare">
            <SectionHead idx="05" kick="compare" title="Built for the inner loop" />
          </Reveal>
          <Reveal className="mt-10">
            <div className="overflow-x-auto rounded-2xl border border-edge">
              <table className="w-full min-w-[660px] border-collapse text-[14.5px] tabular-nums">
                <thead>
                  <tr className="bg-panel text-dim">
                    <th className="px-5 py-3.5 text-left font-medium"></th>
                    <th className="bg-[rgba(255,171,51,0.07)] px-5 py-3.5 text-left font-semibold text-amber">pulse</th>
                    <th className="px-5 py-3.5 text-left font-medium">sam local</th>
                    <th className="px-5 py-3.5 text-left font-medium">LocalStack</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row[0]}>
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{row[0]}</td>
                      <td className="border-t border-edge bg-[rgba(255,171,51,0.05)] px-5 py-3.5 font-medium">
                        {row[1].startsWith("✓") ? (<><span className="text-tgreen">✓</span>{row[1].slice(1)}</>) : row[1]}
                      </td>
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{row[2]}</td>
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{row[3]}</td>
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
        </section>

        {/* ───────────────────── testimonials ───────────────────── */}
        {SHOW_TESTIMONIALS && (
          <section id="testimonials" className="pt-20 md:pt-28">
            <Reveal section="testimonials">
              <SectionHead idx="06" kick="early signal" title="What early users say" />
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
        <section id="get-started" className="pt-20 md:pt-28">
          <Reveal section="get-started">
            <div className="relative overflow-hidden rounded-3xl border border-edge bg-gradient-to-b from-panel to-bg2 px-5 py-12 text-center md:px-7 md:py-16">
              <PulseLine className="pointer-events-none absolute left-1/2 top-9 h-8 w-[720px] -translate-x-1/2 opacity-25" />
              <div className="relative">
                <p className="kick mb-4">get started</p>
                <h2 className="text-balance text-[clamp(28px,4.5vw,44px)] font-bold tracking-tight">
                  Your local cloud, one command away
                </h2>
                <div className="mt-8 flex justify-center">
                  <InstallTabs location="cta" />
                </div>
                <p className="mt-6 text-[14.5px] text-dim">
                  then run <code className="font-mono text-[13.5px] text-amber">pulse tour</code> — five minutes, hands-on, nothing simulated
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3.5">
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
            <span className="whitespace-pre font-mono text-[13px] leading-[1.1] text-amber">{wave}</span>
            <p className="mt-3.5 max-w-[34ch] text-sm leading-relaxed text-dim">
              The missing dev server for AWS serverless. Run the whole app locally, in milliseconds.
            </p>
            <TrackLink href={`${GH}/releases`} event="outbound" props={{ target: "releases-footer" }} className="chip mt-4">
              v0.1.0 · changelog
            </TrackLink>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">{col.title}</h4>
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
    blurb: "Routes answer, queues deliver, tables exist — in under 100 ms. Leave it running; it narrates everything.",
    frame:
      '<span class="text-amber">$ pulse start</span>\n<span class="text-amber">⚡ pulse</span> <span class="text-dim">0.1.0 —</span> <b>shop</b>\n  <span class="text-dim">api</span>        http://localhost:3000\n  <span class="text-dim">routes</span>     <b>POST</b> /orders <span class="text-dim">→</span> <span class="text-tcyan">createOrder</span>\n  <span class="text-dim">try</span>        <span class="text-amber">curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'</span>\n\n<span class="text-tgreen">ready in 99ms</span> <span class="text-dim">— edits apply live</span>',
  },
  {
    id: "loop",
    cmd: "curl → queue → worker",
    title: "Build like it's a web app",
    blurb: "Save a file — the next request runs the new code. The same code deploys with SAM or CDK, unchanged.",
    frame:
      '<span class="text-amber">$ curl -X POST localhost:3000/orders -d \'{"sku":"A1","qty":2}\'</span>\n<span class="text-dim">201</span> {"id":"e9b4…","status":"pending"}\n  <span class="text-tcyan">⚙ sqs order-events → worker · ok</span>\n<span class="text-amber">🎉 first background job processed — your async loop works end to end</span>\n\n<span class="text-amber">$ curl localhost:3000/orders/e9b4…</span>\n{"id":"e9b4…","status":<span class="text-tgreen">"processed"</span>}   <span class="text-dim">← the worker got there first</span>',
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
      "The full-screen cockpit: ✓/✗ per function, live queue depths — a filling dead-letter queue turns red — streaming logs with incremental filtering, and Enter replays the selected event.",
    frame:
      '<span class="text-amber">⚡ pulse</span> <b>shop</b> · <span class="text-tgreen">● live</span>\n\n<span class="text-amber">functions</span>              <span class="text-amber">logs</span> <span class="text-dim">— / filters</span>\n createOrder <span class="text-dim">12✓</span>        <span class="text-dim">14:02</span> createOrder <span class="text-dim">|</span> order saved\n worker      <span class="text-dim">11✓</span> <span class="text-tred">1✗</span>     <span class="text-dim">14:02</span> <span class="text-tcyan">⚙ order-events → worker</span>\n\n<span class="text-amber">queues</span>                 <span class="text-dim">14:02</span> worker <span class="text-dim">|</span> processed\n order-events <span class="text-dim">0·0·0</span>\n orders-dlq   <span class="text-tred">1·0·0 !</span>\n\n<span class="text-amber">events</span> <span class="text-dim">— ↑↓ · Enter replays</span>\n<span class="text-amber">▸</span> <b>8931cf5b</b> sqs → worker · <span class="text-tred">error</span>',
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

const replayMini =
  '<span class="text-amber">$ pulse events replay 8931cf5b</span>\n<span class="text-tgreen">✓ processWebhook · success · 0ms</span>\n<span class="text-dim">same payload · fixed code · passing</span>';

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

const footerCols = [
  { title: "Product", links: [["Features", "#features"], ["Compare", "#compare"], ["Releases", `${GH}/releases`]] as [string, string][] },
  { title: "Docs", links: [["The guide", `${GH}/blob/master/docs/GUIDE.md`], ["Quickstart", `${GH}#two-minutes-to-a-running-app`], ["Cheat sheet", `${GH}/blob/master/docs/GUIDE.md#7-command-cheat-sheet`]] as [string, string][] },
  { title: "Community", links: [["GitHub", GH], ["Issues", `${GH}/issues`]] as [string, string][] },
];
