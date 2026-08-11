import { Terminal } from "@/components/terminal";
import { TrackLink, Reveal } from "@/components/interactive";
import { InstallTabs } from "@/components/install-tabs";
import { InspectTabs, type InspectTab } from "@/components/inspect-tabs";
import { PulseLine } from "@/components/pulse-line";
import { PulseLogo } from "@/components/mark";
import { NavMenu } from "@/components/nav-menu";
import { CountUp } from "@/components/fx";

const GH = "https://github.com/geetnsh2k1/pulse";
const GUIDE = `${GH}/blob/master/docs/GUIDE.md`;

/* The page shell: 18px gutters on phones, 28px above. Most sections run to
   1180px; the hero and the FAQ hold a narrower column of their own, so the
   width is always stated next to GUTTER rather than baked into it (two
   max-w-* utilities on one element resolve by stylesheet order, not by the
   order you wrote them). Sections alternate page background and .slab. */
const GUTTER = "px-[18px] min-[620px]:px-7";
const SHELL = `mx-auto max-w-[1180px] ${GUTTER}`;
const BAND_PAD = "py-[76px] min-[760px]:py-[104px]";
const SECTION_PAD = "pt-[76px] pb-[76px] min-[760px]:pt-[112px] min-[760px]:pb-[104px]";

// Centered section header: numbered eyebrow, headline, one line of lede.
function Head({
  idx, kick, title, lede, width = "max-w-[44ch]",
}: {
  idx: string; kick: string; title: React.ReactNode; lede?: React.ReactNode; width?: string;
}) {
  return (
    <div className={`mx-auto text-center ${width}`}>
      <span className="eyebrow">
        <i>{idx}</i> {kick}
      </span>
      <h2 className="text-balance text-[clamp(26px,3.8vw,42px)] font-semibold leading-[1.14] tracking-[-0.035em]">
        {title}
      </h2>
      {/* pretty, not balance: the headline above is balanced, but for body copy
          we only want the last-line orphan avoided. Ignored where unsupported. */}
      {lede && <p className="mt-3.5 text-[16px] leading-[1.65] text-dim [text-wrap:pretty]">{lede}</p>}
    </div>
  );
}

// A ✓ bullet, the shape used in both feature rows.
function Tick({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="shrink-0 text-tgreen">✓</span>
      {children}
    </li>
  );
}

// Competitor gaps get a visible ✗ so the compare table reads at a glance.
function gap(v: string) {
  if (v === "—" || v === "n/a" || v === "not available") {
    return (
      <>
        <span className="text-tred">✗</span>
        {v !== "—" && <span className="ml-1.5">{v}</span>}
      </>
    );
  }
  return v;
}

const GitHubIcon = (
  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 shrink-0" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const TermDots = (
  <>
    <span className="dot bg-[#ff5f57]" />
    <span className="dot bg-[#febc2e]" />
    <span className="dot bg-[#28c840]" />
  </>
);

export default function Page() {
  return (
    <>
      {/* structured data: SoftwareApplication + FAQPage as two top-level
          scripts (naive validators can't read @graph). FAQ JSON is generated
          from the same `faqs` array that renders below, so the schema always
          matches the visible text — a Google requirement. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ───────────────────────── nav ───────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-edge/80 bg-bg/[0.78] backdrop-blur-[18px]">
        <div className={`flex h-[70px] items-center gap-[34px] ${SHELL}`}>
          <a href="#top" aria-label="pulse — back to top">
            <PulseLogo />
          </a>
          {/* 940, not the design's 860: our GitHub button spells the word out
              where the design showed a star count, so the row needs ~890px
              before the links stop squeezing the CTAs into two lines. */}
          <div className="hidden items-center gap-[26px] min-[940px]:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                /* py-1 lifts the 22px text to a 30px target (WCAG 2.5.8 wants
                   24); the bar's fixed height absorbs it */
                className="py-1 text-[14.5px] text-dim transition-colors hover:text-fg"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden min-[620px]:block">
              <TrackLink
                href={GH}
                event="cta_click"
                props={{ cta: "github", location: "nav" }}
                className="btn btn-ghost btn-sm whitespace-nowrap !font-medium !text-mute hover:!text-fg"
              >
                {GitHubIcon} GitHub
              </TrackLink>
            </span>
            <TrackLink
              href="#install"
              event="cta_click"
              props={{ cta: "get-started", location: "nav" }}
              className="btn btn-primary btn-sm whitespace-nowrap"
            >
              Get started
            </TrackLink>
            <NavMenu links={navLinks} githubHref={GH} />
          </div>
        </div>
      </nav>

      {/* ───────────────────────── hero ───────────────────────── */}
      <header id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-[-20%] top-[-34%] h-[92%] bg-[radial-gradient(52%_50%_at_50%_0%,rgba(255,171,51,0.13),transparent_70%)]" />
        <div className="dotgrid pointer-events-none absolute inset-0 opacity-50" />

        <div
          className={`relative mx-auto grid max-w-[1000px] justify-items-center gap-[26px] pt-[52px] text-center min-[760px]:pt-[68px] ${GUTTER}`}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-amber/[0.28] bg-amber/[0.06] px-4 py-[7px] font-mono text-[12px] text-amber-soft">
            <span className="blip" aria-hidden="true" />
            v0.1.0 · open source · Apache-2.0
          </span>

          <h1 className="max-w-[17ch] text-balance text-[clamp(34px,6vw,68px)] font-bold leading-[1.06] tracking-[-0.035em]">
            Run AWS Lambda, SQS and DynamoDB <em className="not-italic text-amber">locally</em> — without Docker
          </h1>
          <p className="max-w-[52ch] text-[clamp(15px,2vw,19px)] leading-[1.6] text-dim">
            The dev server AWS Lambda never had. Your whole app — API, queues, workers, tables —
            running natively on your laptop in 99 milliseconds.
          </p>

          {/* stacked on a phone, they read as two equal blocks rather than two
              differently-sized pills */}
          <div className="flex w-full flex-wrap justify-center gap-3 min-[520px]:w-auto">
            <TrackLink
              href="#install"
              event="cta_click"
              props={{ cta: "get-started", location: "hero" }}
              className="btn btn-primary btn-beat w-full min-[520px]:w-auto"
            >
              Install pulse
            </TrackLink>
            <TrackLink
              href={GH}
              event="cta_click"
              props={{ cta: "github", location: "hero" }}
              className="btn btn-ghost w-full min-[520px]:w-auto"
            >
              {GitHubIcon} Star on GitHub
            </TrackLink>
          </div>

          {/* the product IS the hero: real CLI, typed live */}
          <Terminal />

          {/* numbers with a "compared to what" (measured, not marketed) */}
          <div
            className="tracks grid w-full grid-cols-1 gap-3.5 min-[620px]:grid-cols-2 min-[860px]:grid-cols-4"
            aria-label="performance, enforced by CI"
          >
            {stats.map(([n, suffix, label, note]) => (
              <div key={label} className="rounded-[14px] border border-edge bg-bg2 px-[18px] py-5 text-left">
                <div className="text-[26px] font-bold tabular-nums tracking-[-0.03em] text-amber">
                  {typeof n === "number" ? <CountUp to={n} suffix={suffix} /> : `${n}${suffix}`}
                </div>
                <div className="mt-1.5 text-[13.5px] font-medium text-fg">{label}</div>
                <div className="mt-[3px] font-mono text-[11px] text-faint">{note}</div>
              </div>
            ))}
          </div>
          <TrackLink
            href={`${GH}/blob/master/internal/perf/perf_test.go`}
            event="outbound"
            props={{ target: "perf-ci" }}
            className="py-1 font-mono text-[11.5px] text-faint underline decoration-edge underline-offset-4 transition-colors hover:text-dim"
          >
            measured on every CI run — a slower pulse is a failed build ↗
          </TrackLink>
        </div>
      </header>

      {/* ───────────────────── 01 · features ───────────────────── */}
      <section id="features" className={`${SHELL} ${SECTION_PAD}`}>
        <Reveal section="features">
          <Head
            idx="01"
            kick="features"
            title="A local cloud that keeps up with your typing"
            lede="No containers to build, no orchestration to debug. Just your app, running."
          />
        </Reveal>

        <div className="tracks mt-13 flex flex-col gap-4">
          {/* the async loop — the thing no other local tool does */}
          <Reveal>
            <div className="sheet tracks grid items-center gap-7 rounded-[20px] p-[26px] min-[980px]:grid-cols-2 min-[980px]:gap-10 min-[980px]:p-9">
              <div>
                <span className="inline-flex rounded-[7px] border border-amber/[0.28] bg-amber/[0.08] px-[11px] py-[5px] font-mono text-[11px] uppercase tracking-[0.14em] text-amber-soft">
                  sqs · retries · dlq
                </span>
                <h3 className="mt-[18px] text-[23px] font-semibold tracking-[-0.028em]">
                  Push to a queue, handle it in a worker
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.7] text-dim">
                  You never call a worker yourself. pulse watches the queue and delivers.
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[14px] leading-[1.5] text-dim">
                  <Tick>Visibility timeouts and automatic retries</Tick>
                  <Tick>Dead-letter queue when it keeps failing</Tick>
                  <Tick>
                    The one thing <i>sam local</i> can&apos;t do at all
                  </Tick>
                </ul>
                <div className="mt-[22px] flex items-center gap-3.5 font-mono text-[12.5px]">
                  <span className="shrink-0 rounded-[10px] border border-edge bg-bg px-3.5 py-2.5">POST /orders</span>
                  <PulseLine stretch className="h-[46px] min-w-10 flex-1" />
                  <span className="shrink-0 rounded-[10px] border border-tgreen/30 bg-bg px-3.5 py-2.5 text-tgreen">
                    worker ✓
                  </span>
                </div>
              </div>
              <div className="term term-inset">
                <div className="term-head">
                  {TermDots}
                  <span className="ml-1.5">pulse start</span>
                </div>
                <div className="term-body">
                  <span className="text-tcyan">⚙ sqs order-events → worker · batch of 1 · ok</span>
                  {"\n"}
                  {"  worker "}
                  <span className="text-faint">|</span> processed order 9de0…{"\n"}
                  <span className="text-faint">{"  worker !"}</span>{" "}
                  <span className="text-tred">RuntimeError (attempt 1)</span>
                  {"\n"}
                  <span className="text-faint">{"  worker !"}</span>{" "}
                  <span className="text-tred">RuntimeError (attempt 2)</span>
                  {"\n"}
                  <span className="text-tred">☠ moved to order-events-dlq after 3 receives</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* hot reload */}
          <Reveal>
            <div className="sheet tracks grid items-center gap-7 rounded-[20px] p-[26px] min-[980px]:grid-cols-2 min-[980px]:gap-10 min-[980px]:p-9">
              <div>
                <span className="inline-flex rounded-[7px] border border-tgreen/[0.28] bg-tgreen/[0.07] px-[11px] py-[5px] font-mono text-[11px] uppercase tracking-[0.14em] text-tgreen">
                  hot reload
                </span>
                <h3 className="mt-[18px] text-[23px] font-semibold tracking-[-0.028em]">
                  Build &amp; run Lambdas, measured in milliseconds
                </h3>
                <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.7] text-dim">
                  Save a file. The next request runs the new code. Restarts don&apos;t exist here.
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-[14px] leading-[1.5] text-dim">
                  <Tick>Real Lambda Runtime API, as a native process</Tick>
                  <Tick>Plain boto3 or SDK v3 — no pulse imports</Tick>
                  <Tick>
                    <span>
                      <code className="font-mono text-[13px] text-amber-soft">pulse.yaml</code> edits apply live too
                    </span>
                  </Tick>
                </ul>
                <div className="cycle mt-[22px] flex flex-col gap-2 font-mono text-[12.3px]">
                  <div className="flex items-center gap-2.5 rounded-[10px] border border-edge bg-bg px-3.5 py-2.5">
                    <span className="text-amber">⌘S</span> handler.py saved
                  </div>
                  <div className="flex items-center gap-2.5 rounded-[10px] border border-edge bg-bg px-3.5 py-2.5">
                    <span className="text-amber">⟳</span> hot reload: worker (1 change)
                  </div>
                  <div className="flex items-center gap-2.5 rounded-[10px] border border-edge bg-bg px-3.5 py-2.5">
                    <span className="text-tgreen">→</span> next invoke · 17 ms
                  </div>
                </div>
              </div>
              <div className="term term-inset">
                <div className="term-head">
                  {TermDots}
                  <span className="ml-1.5">handler.py</span>
                </div>
                <div className="term-body">
                  <span className="text-tcyan">import</span> boto3{"\n"}
                  table = boto3.resource(<span className="text-tgreen">&quot;dynamodb&quot;</span>).Table(
                  <span className="text-tgreen">&quot;orders&quot;</span>){"\n"}
                  {"\n"}
                  <span className="text-tcyan">def</span> handler(event, context):{"\n"}
                  {"    "}
                  <span className="text-tcyan">return</span> {"{"}
                  <span className="text-tgreen">&quot;statusCode&quot;</span>: <span className="text-amber-soft">200</span>
                  {"}"}
                  {"\n"}
                  {"\n"}
                  <span className="text-faint"># local → AWS_ENDPOINT_URL set for you</span>
                  {"\n"}
                  <span className="text-faint"># prod  → same code, talks to AWS</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* three cards in two columns leaves the third stranded beside a hole,
            so in that range it takes the whole row */}
        <Reveal className="mt-4">
          <div className="tracks grid gap-4 min-[620px]:grid-cols-2 min-[620px]:[&>*:last-child]:col-span-2 min-[980px]:grid-cols-3 min-[980px]:[&>*:last-child]:col-span-1">
            {featureCards.map(([glyph, title, body]) => (
              <div key={title} className="lift h-full rounded-[18px] border border-edge bg-panel p-7">
                <span
                  aria-hidden="true"
                  className="grid size-[38px] place-items-center rounded-[11px] border border-amber/25 bg-amber/[0.08] font-mono text-[16px] text-amber"
                >
                  {glyph}
                </span>
                <h3 className="mt-[18px] text-[17px] font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-dim">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ───────────────────── 02 · how it works ───────────────────── */}
      <section id="how" className="slab">
        <div className={`${SHELL} ${BAND_PAD}`}>
          <Reveal section="how">
            <Head
              idx="02"
              kick="how it works"
              title="One engine, entirely on your laptop"
              lede="One native process, one SQLite file. Four steps from empty folder to replayable request."
            />
          </Reveal>

          <div className="mx-auto mt-13 flex max-w-[760px] flex-col gap-3.5">
            {steps.map(([title, body, cmd], i) => (
              <Reveal key={title} delay={Math.min(i * 60, 180)}>
                <div className="grid grid-cols-[38px_minmax(0,1fr)] items-start gap-5">
                  <span className="grid size-[38px] place-items-center rounded-full border border-amber/30 bg-amber/[0.07] font-mono text-[12px] text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 rounded-[16px] border border-edge bg-panel px-[26px] py-6">
                    <h3 className="text-[17.5px] font-semibold tracking-[-0.02em]">{title}</h3>
                    <p className="mt-2 max-w-[58ch] text-[14.5px] leading-[1.65] text-dim">{body}</p>
                    <code className="mt-4 block overflow-x-auto whitespace-nowrap rounded-[10px] border border-edge bg-bg px-[15px] py-[11px] font-mono text-[12.5px] text-amber">
                      $ {cmd}
                    </code>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── 03 · debugging ───────────────────── */}
      <section id="inspect" className={`${SHELL} ${SECTION_PAD}`}>
        <Reveal section="inspect">
          <Head
            idx="03"
            kick="debugging"
            title="You never lose the event that broke it"
            lede="Logs are where debugging starts, not where it ends. Four ways to see what actually happened."
            width="max-w-[46ch]"
          />
        </Reveal>
        <Reveal className="mt-12">
          <InspectTabs tabs={inspectTabs} />
        </Reveal>
      </section>

      {/* ───────────────────── 04 · compare ───────────────────── */}
      <section id="compare" className="slab">
        <div className={`${SHELL} ${BAND_PAD}`}>
          <Reveal section="compare">
            <Head
              idx="04"
              kick="compare"
              title="Built for the inner loop"
              lede="LocalStack tests your infra. SAM deploys. pulse owns the five hundred iterations before staging."
              width="max-w-[46ch]"
            />
          </Reveal>

          {/* 890px is what every cell needs to stay on one line; the design's
              680 let the browser squeeze the pulse column — the one that
              matters — to 136px and wrap all 28 cells. Below 620 the min drops
              and only the *values* keep nowrap, so a phone's first screenful is
              the feature plus the pulse answer rather than labels alone. */}
          <Reveal className="mt-11">
            <div className="overflow-x-auto rounded-[18px] border border-edge">
              <table className="cmp w-full min-w-[690px] border-collapse text-[14.5px] tabular-nums min-[620px]:min-w-[890px]">
                <thead>
                  <tr className="bg-panel text-dim">
                    <th className="px-[22px] py-4 text-left text-[13.5px] font-medium">Feature</th>
                    <th className="bg-amber/[0.06] px-[22px] py-4 text-left font-semibold text-amber">pulse</th>
                    <th className="px-[22px] py-4 text-left font-medium">sam local</th>
                    <th className="px-[22px] py-4 text-left font-medium">LocalStack</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row[0]}>
                      <td className="border-t border-edge px-[22px] py-4 text-dim">{row[0]}</td>
                      <td className="border-t border-edge bg-amber/[0.035] px-[22px] py-4 font-medium whitespace-nowrap text-amber-soft">
                        {row[1].startsWith("✓") ? (
                          <>
                            <span className="text-tgreen">✓</span>
                            {row[1].slice(1)}
                          </>
                        ) : (
                          row[1]
                        )}
                      </td>
                      <td className="border-t border-edge px-[22px] py-4 whitespace-nowrap text-faint">{gap(row[2])}</td>
                      <td className="border-t border-edge px-[22px] py-4 whitespace-nowrap text-faint">{gap(row[3])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          {/* the table scrolls under ~946px; say so rather than leaving it to
              be discovered */}
          <p className="mt-3 text-center font-mono text-[11.5px] text-faint min-[946px]:hidden">
            swipe the table to compare →
          </p>

          <p className="mx-auto mt-7 max-w-[72ch] border-l-[3px] border-amber py-1.5 pl-5 text-[15px] leading-[1.7] text-dim">
            <b className="font-semibold text-fg">Honesty by design.</b> pulse does one workflow completely — CRUD
            APIs with background jobs. Anything outside that subset fails loudly with a message saying so, never
            silently wrong. S3, SNS, EventBridge and Step Functions are on the roadmap, not pretended.
          </p>
        </div>
      </section>

      {/* ───────────────────── 05 · build ───────────────────── */}
      <section id="build" className={`${SHELL} ${SECTION_PAD}`}>
        <Reveal section="build">
          <Head
            idx="05"
            kick="build"
            title="Grow your app one command at a time"
            lede={
              <>
                Every piece — a function, a route, a queue, a table — is one command. Run it bare and it asks instead
                of demanding flags; each edits{" "}
                <code className="font-mono text-[14px] text-amber-soft">pulse.yaml</code> for you and applies live.
              </>
            }
            width="max-w-[46ch]"
          />
        </Reveal>

        <Reveal className="mt-12">
          <div className="tracks grid gap-4 min-[980px]:grid-cols-2">
            {commands.map(([cmd, title, body]) => (
              <div key={title} className="lift h-full rounded-[16px] border border-edge bg-panel px-7 py-[26px]">
                <code className="block overflow-x-auto whitespace-nowrap font-mono text-[13px] text-amber">
                  $ {cmd}
                </code>
                <h3 className="mt-3.5 text-[16.5px] font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-dim">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mx-auto mt-5 max-w-[64ch] text-center text-[13.5px] leading-[1.7] text-faint">
          <code className="font-mono text-dim">pulse remove</code> is the exact inverse — it unwires the piece and
          never deletes your code or data.
        </p>

        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <h3 className="text-[22px] font-semibold tracking-[-0.028em]">Or start from a template</h3>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-[1.7] text-dim [text-wrap:pretty]">
                  Four starters, each adding exactly one concept. All ship in{" "}
                  <b className="font-medium text-fg">Python and Node</b>, use the plain AWS SDK, and run unchanged in
                  real AWS.
                </p>
              </div>
              <code className="font-mono text-[12.5px] text-faint">$ pulse init --list</code>
            </div>
          </Reveal>
          <Reveal className="mt-7">
            <div className="tracks grid gap-4 min-[620px]:grid-cols-2 min-[860px]:grid-cols-4">
              {templates.map(([name, tag, body], i) => {
                const star = i === templates.length - 1;
                return (
                  <div
                    key={name}
                    className={
                      star
                        ? "h-full rounded-[16px] border border-amber/[0.32] bg-amber/[0.05] p-6"
                        : "lift h-full rounded-[16px] border border-edge bg-panel p-6"
                    }
                  >
                    <code className="font-mono text-[13px] text-amber">{name}</code>
                    <p className={`mt-3 text-[14px] leading-[1.65] ${star ? "text-mute" : "text-dim"}`}>{body}</p>
                    <p
                      className={`mt-3.5 border-t pt-3 font-mono text-[11px] ${
                        star ? "border-amber/20 text-amber-soft" : "border-edge text-faint"
                      }`}
                    >
                      {tag}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── 06 · faq ───────────────────── */}
      <section id="faq" className="slab">
        <div className={`mx-auto max-w-[880px] ${GUTTER} ${BAND_PAD}`}>
          <Reveal section="faq">
            <div className="text-center">
              <span className="eyebrow">
                <i>06</i> faq
              </span>
              <h2 className="text-[clamp(26px,3.8vw,42px)] font-semibold leading-[1.14] tracking-[-0.035em]">
                Questions people actually ask
              </h2>
            </div>
          </Reveal>
          <Reveal className="faq mt-9">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <p className="a">{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── install ───────────────────── */}
      <section id="install" className={`${SHELL} pt-[76px] pb-[76px] min-[760px]:py-[112px]`}>
        <Reveal section="install">
          <div className="relative overflow-hidden rounded-[26px] border border-edge bg-gradient-to-b from-panel to-band px-5 py-12 text-center min-[620px]:px-10 min-[620px]:py-[72px]">
            <div className="pointer-events-none absolute inset-x-[-20%] top-[-60%] h-[120%] bg-[radial-gradient(45%_45%_at_50%_30%,rgba(255,171,51,0.13),transparent_70%)]" />
            {/* scales down instead of being cropped to its middle on a phone */}
            <PulseLine
              stretch
              className="pointer-events-none absolute left-1/2 top-[30px] h-[34px] w-full max-w-[680px] -translate-x-1/2 opacity-30"
            />
            <div className="relative">
              <h2 className="text-balance text-[clamp(28px,4.2vw,48px)] font-semibold leading-[1.08] tracking-[-0.04em]">
                Ready for the instant dev loop?
              </h2>
              <p className="mx-auto mt-4 max-w-[44ch] text-[16px] leading-[1.65] text-dim">
                Install pulse with one command and boot your first Lambda in under 100 milliseconds.
              </p>
              <div className="mt-[34px] flex justify-center">
                <InstallTabs location="cta" />
              </div>
              <p className="mt-[22px] text-[14.5px] text-dim">
                then run <code className="font-mono text-[13.5px] text-amber">pulse tour</code> — five minutes,
                hands-on, nothing simulated
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <TrackLink
                  href={`${GH}#two-minutes-to-a-running-app`}
                  event="outbound"
                  props={{ target: "quickstart-cta" }}
                  className="btn btn-primary w-full !px-6 !py-[13px] !text-[15px] min-[520px]:w-auto"
                >
                  Read the quickstart
                </TrackLink>
                <TrackLink
                  href={GUIDE}
                  event="outbound"
                  props={{ target: "guide-cta" }}
                  className="btn btn-ghost w-full !px-6 !py-[13px] !text-[15px] min-[520px]:w-auto"
                >
                  {GitHubIcon} Browse GitHub docs
                </TrackLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────── footer ───────────────────── */}
      <footer className="border-t border-edge bg-band">
        <div className={`tracks grid grid-cols-2 gap-x-7 gap-y-9 py-14 min-[760px]:grid-cols-3 min-[980px]:grid-cols-[1.5fr_1fr_1fr_1fr] ${SHELL}`}>
          <div className="col-span-full min-[980px]:col-span-1">
            <PulseLogo />
            <p className="mt-3.5 max-w-[34ch] text-[14px] leading-[1.7] text-dim">
              Fast, Docker-free local AWS Lambda, SQS and DynamoDB emulation. Apache-2.0 open source.
            </p>
            <TrackLink href={`${GH}/releases`} event="outbound" props={{ target: "releases-footer" }} className="chip mt-4 !text-[11.5px]">
              v0.1.0 · changelog
            </TrackLink>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-faint">{col.title}</h3>
              {/* py-1/-my-1: a 14px link is a 21px tap target, under the 24px
                  WCAG 2.5.8 minimum. The padding grows the hit box; the
                  negative margin gives the space back, so the 10px rhythm the
                  design specifies is unchanged. */}
              <div className="mt-4 flex flex-col gap-2.5">
                {col.links.map(([label, href]) => (
                  <TrackLink
                    key={label}
                    href={href}
                    event="outbound"
                    props={{ target: label.toLowerCase().replace(/\s/g, "-") }}
                    className="-my-1 w-fit py-1 text-[14px] text-mute transition-colors hover:text-amber"
                  >
                    {label}
                  </TrackLink>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-edge">
          <div className={`flex flex-wrap gap-5 pt-5 pb-7 text-[12.5px] text-faint ${SHELL}`}>
            <span>Apache-2.0 © Geetansh Garg</span>
            <span>
              Not affiliated with Amazon Web Services. AWS, Lambda, SQS and DynamoDB are trademarks of Amazon.com, Inc.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════ content data ═══════════════════════
   Every terminal frame below is verbatim output from the real CLI
   (captured in docs/GUIDE.md and live sessions) — nothing invented. */

const navLinks: [string, string][] = [
  ["Features", "#features"],
  ["How it works", "#how"],
  ["Debugging", "#inspect"],
  ["Compare", "#compare"],
  ["FAQ", "#faq"],
];

// [value, suffix, label, what it's compared against]. A number counts up;
// a string is rendered as-is.
const stats: [number | string, string, string, string][] = [
  [99, "ms", "Engine ready", "containers: 10–30 s"],
  [17, "ms", "Warm invoke", "no cold containers"],
  [50, " MB", "Total memory", "Docker stacks: 2 GB+"],
  ["$0", "", "To learn & build", "no AWS account needed"],
];

const featureCards: [string, string, string][] = [
  ["↻", "Time travel debugging", "Replay yesterday's crash against today's fix — byte for byte."],
  ["◈", "Runs like AWS", "Real wire protocols throughout — the AWS SDK can't tell the difference."],
  [">_", "A CLI that teaches", "Run any command bare and it asks instead of erroring. Errors ship their fix."],
];

// [title, body, command] — four steps, empty folder to replayable request.
const steps: [string, string, string][] = [
  [
    "Spin up the dev loop",
    "Working handlers, a pulse.yaml, dependencies installed. Then the API, queues and tables all come online together.",
    "pulse init shop -t api-and-worker && pulse start",
  ],
  [
    "Call it over plain HTTP",
    "Your route becomes a real API Gateway event — path params, query strings, body, exactly like production.",
    `curl -X POST localhost:3000/orders -d '{"sku":"A1"}'`,
  ],
  [
    "Let a worker finish the job",
    "Your handler queues a message and replies immediately; pulse delivers it, retries failures and dead-letters repeat offenders.",
    `pulse send order-events '{"id":"e9b4"}'`,
  ],
  [
    "Replay whatever broke",
    "Every payload is recorded. Fix the handler, re-fire the actual event against your current code, watch it pass.",
    "pulse events replay 8931cf5b",
  ],
];

const inspectTabs: InspectTab[] = [
  {
    id: "story",
    label: "One request's whole story",
    cmd: "pulse logs --request d90e5295",
    caption:
      "One id, the whole story: the exact payload that arrived, everything the function printed, how it ended — and the command to re-run it.",
    frame:
      '<span class="text-amber">$ pulse logs --request d90e5295</span>\n<span class="text-amber">⚡ request</span> <b class="font-medium text-fg">d90e5295</b>  <span class="text-tcyan">sqs</span> <span class="text-faint">→</span> processWebhook · <span class="text-tred">error</span> <span class="text-faint">· 2ms · 00:08</span>\n\n<span class="text-amber">event</span>\n  {\n    "Records": [\n      { <span class="text-faint">…the exact payload that arrived, pretty-printed…</span> }\n<span class="text-faint">  … 6 more line(s)</span>\n\n<span class="text-amber">logs</span>\n<span class="text-faint">  00:08:15.903  stderr</span>  Traceback (most recent call last): …\n\n<span class="text-amber">error</span>\n<span class="text-tred">  RuntimeError: webhook 3625d493 failed on purpose (attempt 3)</span>\n\n<span class="text-faint">re-run it against your current code:</span> <span class="text-amber">pulse events replay d90e5295</span>',
  },
  {
    id: "replay",
    label: "History & replay",
    cmd: "pulse events replay 8931cf5b",
    caption:
      "Every trigger ever recorded, byte for byte. Fix the handler, replay yesterday's actual crash, watch it pass — no reconstructing inputs from log fragments.",
    frame:
      '<span class="text-amber">$ pulse events -n 6</span>\n  <b class="font-medium text-fg">8931cf5b</b>  <span class="text-faint">Aug  5 01:01</span>   sqs    <span class="text-faint">→</span> processWebhook · <span class="text-tred">error</span>   <span class="text-faint">· 1ms</span>\n  <b class="font-medium text-fg">7275f6ee</b>  <span class="text-faint">Aug  5 01:01</span>   http   <span class="text-faint">→</span> receiveWebhook · <span class="text-tgreen">success</span> <span class="text-faint">· 1ms</span>\n  <b class="font-medium text-fg">4c1ad0e2</b>  <span class="text-faint">Aug  5 00:58</span>   sqs    <span class="text-faint">→</span> worker         · <span class="text-tgreen">success</span> <span class="text-faint">· 3ms</span>\n  <b class="font-medium text-fg">b60f7a19</b>  <span class="text-faint">Aug  5 00:58</span>   http   <span class="text-faint">→</span> createOrder    · <span class="text-tgreen">success</span> <span class="text-faint">· 2ms</span>\n  <b class="font-medium text-fg">2ff8c447</b>  <span class="text-faint">Aug  5 00:57</span>   replay <span class="text-faint">→</span> worker         · <span class="text-tgreen">success</span> <span class="text-faint">· 1ms</span>\n  <b class="font-medium text-fg">0a4e91bd</b>  <span class="text-faint">Aug  5 00:57</span>   http   <span class="text-faint">→</span> getOrder       · <span class="text-tgreen">success</span> <span class="text-faint">· 1ms</span>\n\n<span class="text-faint">replay any: pulse events replay &lt;id&gt; · narrow: --function &lt;fn&gt;</span>\n\n<span class="text-amber">$ pulse events replay 8931cf5b</span>\n<span class="text-faint">↻ replaying 8931cf5b — sqs → processWebhook, originally Aug  5 01:01</span>\n\n<span class="text-tgreen">✓ processWebhook · success · 0ms · request 94aacd31</span>\n<span class="text-faint">← same payload, byte for byte, against your current code</span>',
  },
  {
    id: "monitor",
    label: "Live dashboard",
    cmd: "pulse monitor",
    caption:
      "The full-screen cockpit: ✓/✗ per function, live queue depths (a filling DLQ turns red), streaming filtered logs, and Enter replays the selected event.",
    frame:
      '<span class="text-amber">⚡ pulse</span> <b class="font-medium text-fg">shop</b> · <span class="text-tgreen">● live</span> · api http://localhost:3000\n\n<span class="text-amber">functions</span>              <span class="text-amber">logs</span> <span class="text-faint">— / filters</span>\n createOrder <span class="text-faint">12✓</span>        <span class="text-faint">14:02</span> createOrder <span class="text-faint">|</span> order saved\n worker      <span class="text-faint">11✓</span> <span class="text-tred">1✗</span>     <span class="text-faint">14:02</span> <span class="text-tcyan">⚙ order-events → worker</span>\n\n<span class="text-amber">queues</span>                 <span class="text-faint">14:02</span> worker <span class="text-faint">|</span> processed\n order-events <span class="text-faint">0·0·0</span>\n orders-dlq   <span class="text-tred">1·0·0 !</span>\n\n<span class="text-amber">events</span> <span class="text-faint">— ↑↓ · Enter replays</span>\n<span class="text-amber">▸</span> <b class="font-medium text-fg">8931cf5b</b> sqs → worker · <span class="text-tred">error</span>\n  <b class="font-medium text-fg">7275f6ee</b> http → createOrder · <span class="text-tgreen">success</span>\n\n<span class="text-faint">q quit · tab focus events · ↑↓ select · Enter replay · / filter</span>',
  },
  {
    id: "tables",
    label: "Tables & queues",
    cmd: "pulse tables · pulse peek",
    caption:
      "No aws-cli, no console tab. Browse table items decoded for humans; peek at waiting messages without consuming them.",
    frame:
      '<span class="text-amber">$ pulse tables</span>\n  <b class="font-medium text-fg">orders</b>     <span class="text-faint">4 item(s)</span>   <span class="text-faint">pk id</span>\n  <b class="font-medium text-fg">customers</b>  <span class="text-faint">2 item(s)</span>   <span class="text-faint">pk email</span>\n\n<span class="text-amber">$ pulse tables orders</span>\n<b class="font-medium text-fg">orders</b> <span class="text-faint">— 4 item(s) shown</span>\n  <b class="font-medium text-fg">e9b4e51a-…</b>  <span class="text-faint">createdAt="…" ·</span> qty="2" · sku="A1" · status=<span class="text-tgreen">"processed"</span>\n  <b class="font-medium text-fg">7c02d8f4-…</b>  <span class="text-faint">createdAt="…" ·</span> qty="1" · sku="B7" · status=<span class="text-tgreen">"processed"</span>\n  <b class="font-medium text-fg">1de6b90a-…</b>  <span class="text-faint">createdAt="…" ·</span> qty="9" · sku="X" · status=<span class="text-tred">"failed"</span>\n  <b class="font-medium text-fg">parked-1</b>    <span class="text-faint">processedAt="…" ·</span> status=<span class="text-tgreen">"processed"</span>\n\n<span class="text-amber">$ pulse peek order-events</span>\n<b class="font-medium text-fg">order-events</b> <span class="text-faint">— 2 message(s), oldest first (peeking doesn\'t consume)</span>\n  <b class="font-medium text-fg">473b4539</b>  <span class="text-tgreen">visible</span>     {"id":"parked-1"}\n  <b class="font-medium text-fg">9a1c77e0</b>  <span class="text-faint">hidden 4s</span>  <span class="text-faint">retried ×2</span>  {"id":"1de6b90a"}',
  },
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

// [command, title, what it actually writes]
const commands: [string, string, React.ReactNode][] = [
  [
    "pulse add function notifier",
    "Add a function",
    <>
      Writes <span className="text-mute">services/notifier/handler.py</span> — a working, commented Lambda handler —
      and registers it.
    </>,
  ],
  [
    "pulse add route POST /notify --function notifier",
    "Give it a URL",
    "Functions and routes stay separate on purpose — exactly how real AWS models them.",
  ],
  [
    "pulse add queue emails --worker send-email --dlq",
    "Add a queue & worker",
    <>
      Queue, worker function, wiring and dead-letter queue in one line. Then{" "}
      <span className="text-mute">pulse send emails &apos;{"{…}"}&apos;</span>.
    </>,
  ],
  [
    "pulse add table customers --pk email",
    "Add a table",
    "A table's whole schema is its key — every other field is just code. No migrations, ever.",
  ],
];

const templates: [string, string, React.ReactNode][] = [
  [
    "hello",
    "your first function",
    <>
      One function behind <span className="text-mute">GET /hello</span> — the smallest possible start.
    </>,
  ],
  ["todo-api", "+ a real table", "Real CRUD on one DynamoDB table: create, list, complete, delete."],
  ["webhook-relay", "+ a queue & DLQ", "Ack-fast webhook handling with retries and a dead-letter queue."],
  ["api-and-worker ★", "everything together", "The full loop: API + queue + worker + table, wired and narrated."],
];

// Rendered as the FAQ accordions AND serialized into FAQPage JSON-LD below —
// one array, so the schema can never drift from the visible text (a Google
// requirement). Adding a question here adds it to both.
//
// Eight, ordered the way a skeptic asks them: does it work → what's the catch
// → how does it compare → will it fit my code → what happens after. Each one
// answers a distinct objection; anything already answered by a section above
// (can I debug queues? does it work offline?) is deliberately left out so the
// list stays readable.
const faqs: [string, string][] = [
  ["Can I really run AWS Lambda locally?", "Yes. pulse runs your functions natively against the real Lambda Runtime API — the same contract AWS uses in production. Node.js and Python, no Docker, ready in about 100 milliseconds."],
  ["Does pulse require Docker?", "No. pulse is one ~20 MB binary that runs your functions as native processes — no images to pull, no containers to boot, no daemon idling in the background. A complete app with an API, a queue, a worker and a table sits around 50 MB of memory, which is why it starts in milliseconds instead of tens of seconds."],
  ["Which languages does pulse support?", "Node.js and Python today. Every template ships in both, and handlers are plain AWS SDK code with no pulse imports to remove later. The other Lambda runtimes — Java, Go, .NET, Ruby — are not supported yet, and pulse says so plainly rather than half-running them."],
  ["Is pulse a LocalStack alternative?", "For the inner development loop, yes. LocalStack emulates ~100 AWS services inside Docker and shines at testing infrastructure code. pulse does one workflow completely — Lambda, HTTP, SQS, DynamoDB — natively, with dev-server ergonomics: hot reload, event replay, a live monitor."],
  ["Does pulse replace sam local?", "They do different jobs. sam local starts a container per invocation and cannot run the queue → worker → dead-letter-queue loop continuously; pulse runs your whole app as a long-lived local cloud with hot reload. Your deploy pipeline keeps using SAM or CDK — pulse is development-time only and never touches it."],
  ["Does it work with boto3 and the AWS SDK?", "Yes — plain boto3 in Python, AWS SDK for JavaScript v3 in Node. pulse sets AWS_ENDPOINT_URL for your functions automatically, so the same code talks to pulse locally and to real AWS in production."],
  ["Does my data survive restarts?", "Yes. DynamoDB items, queued messages and event history persist in .pulse/data (SQLite). Stop the engine, restart tomorrow — everything is still there, free, by default."],
  ["How do I deploy an app built with pulse?", "With whatever you already use — SAM, CDK or the Serverless Framework. pulse is development-time only and your code is vanilla AWS SDK throughout, so there is nothing to strip out."],
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
  url: "https://www.getpulse.run",
  // the generated route, not a file — /opengraph-image.png no longer exists.
  // Next appends a cache-busting query to the <meta> tag, but the bare path
  // serves the same PNG and is stable across deploys, which is what schema wants.
  image: "https://www.getpulse.run/opengraph-image",
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
  { title: "Product", links: [["Features", "#features"], ["vs LocalStack", "/vs/localstack"], ["vs sam local", "/vs/sam-local"], ["Roadmap", `${GH}/blob/master/PLAN.md`]] as [string, string][] },
  { title: "Resources", links: [["The guide", GUIDE], ["Quickstart", `${GH}#two-minutes-to-a-running-app`], ["Templates", `${GUIDE}#3-build`], ["Cheat sheet", `${GUIDE}#7-command-cheat-sheet`]] as [string, string][] },
  { title: "Community", links: [["GitHub", GH], ["Issues", `${GH}/issues`], ["Share feedback", `${GH}/issues/new`]] as [string, string][] },
];
