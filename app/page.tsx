import { Terminal } from "@/components/terminal";
import { CopyInstall, TrackLink, Reveal } from "@/components/interactive";

const GH = "https://github.com/geetnsh2k1/pulse";
const BREW = "brew install --cask geetnsh2k1/pulse/pulse";

const wave = ` ─╮ ╭─╮ ╭──\n  ╰─╯ ╰─╯`;

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="mb-3.5 font-mono text-[12.5px] uppercase tracking-[0.18em] text-amber">{children}</p>;
}

export default function Page() {
  return (
    <>
      {/* nav */}
      <nav className="sticky top-0 z-50 border-b border-edge bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-7 px-6">
          <a href="#top" className="flex items-center gap-2.5 text-lg font-bold text-fg">
            <span className="whitespace-pre font-mono text-[11px] leading-[1.05] text-amber">{" ─╮╭─╮╭─\n ╰╯ ╰╯"}</span>
            pulse
          </a>
          <div className="ml-3 hidden gap-6 md:flex">
            <a className="text-[14.5px] text-dim hover:text-fg" href="#features">Features</a>
            <a className="text-[14.5px] text-dim hover:text-fg" href="#how">How it works</a>
            <a className="text-[14.5px] text-dim hover:text-fg" href="#compare">Compare</a>
            <TrackLink className="text-[14.5px] text-dim hover:text-fg" href={`${GH}/blob/master/docs/GUIDE.md`} event="outbound" props={{ target: "docs" }}>Docs</TrackLink>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <TrackLink href={GH} event="cta_click" props={{ target: "github_nav" }}
              className="inline-flex items-center gap-2 rounded-lg border border-edge px-4 py-2.5 text-[14.5px] font-semibold text-fg hover:border-dim">
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </TrackLink>
            <a href="#get-started" className="rounded-lg border border-amber bg-amber px-4 py-2.5 text-[14.5px] font-semibold text-amber-dark hover:border-amber-soft hover:bg-amber-soft">
              Get started
            </a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header id="top" className="relative overflow-hidden pt-21">
        <div className="pointer-events-none absolute inset-x-[-20%] top-[-40%] h-[90%] bg-[radial-gradient(60%_55%_at_50%_0%,rgba(255,171,51,0.13),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[1120px] justify-items-center gap-6 px-6 pt-20 text-center">
          <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-amber">
            open source · apache-2.0 · one 20 mb binary
          </p>
          <h1 className="max-w-[20ch] text-balance text-[clamp(38px,6.5vw,68px)] font-bold leading-[1.05] tracking-tight">
            The missing <em className="not-italic text-amber">dev server</em> for AWS serverless
          </h1>
          <p className="max-w-[62ch] text-balance text-[clamp(16px,2.2vw,19px)] text-dim">
            Every stack has one — Rails, Vite, Next. Serverless never did. pulse runs your whole
            app — API, queues, workers, DynamoDB — natively on your laptop. No Docker. No AWS
            account. Vanilla SDK code that runs unchanged in production.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3.5">
            <a href="#get-started" className="rounded-lg border border-amber bg-amber px-5 py-3 font-semibold text-amber-dark hover:bg-amber-soft">Install pulse</a>
            <a href="#how" className="rounded-lg border border-edge px-5 py-3 font-semibold text-fg hover:border-dim">See how it works</a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-11 gap-y-3" aria-label="performance, enforced by CI">
            {[["99 ms", "engine ready"], ["17 ms", "warm invoke"], ["50 MB", "memory, app running"], ["$0", "no AWS bill to learn"]].map(([n, l]) => (
              <div key={l} className="font-mono">
                <b className="text-[22px] font-bold tabular-nums text-amber">{n}</b>
                <span className="mt-0.5 block text-[12.5px] text-dim">{l}</span>
              </div>
            ))}
          </div>
          <Terminal />
        </div>
      </header>

      {/* works-with strip */}
      <div className="mt-16 border-y border-edge bg-bg2">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-baseline justify-center gap-x-11 gap-y-4 px-6 py-4.5 font-mono text-[13px] text-dim">
          <span>works with what you already use</span>
          {["boto3", "AWS SDK JS v3", "SAM / CDK deploys", "GitHub Actions", "zsh · bash · fish"].map((t) => (
            <b key={t} className="font-medium text-fg">{t}</b>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1120px] px-6">
        {/* features */}
        <section id="features" className="pt-24">
          <Kicker>features</Kicker>
          <h2 className="text-balance text-[clamp(28px,4.5vw,42px)] font-bold tracking-tight">
            A local cloud that keeps up with your typing
          </h2>
          <p className="mt-4 max-w-[62ch] text-[clamp(16px,2.2vw,19px)] text-dim">
            pulse implements AWS&apos;s real Lambda Runtime API and speaks the real SQS and DynamoDB
            wire protocols — fidelity by construction, speed from native processes instead of containers.
          </p>
          <div className="mt-11 grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Reveal key={f.title}>
                <div className="h-full rounded-[10px] border border-edge bg-panel p-6">
                  <div className="text-amber">{f.icon}</div>
                  <h3 className="mb-2 mt-3.5 text-[17px] font-semibold">{f.title}</h3>
                  <p className="text-[14.5px] text-dim" dangerouslySetInnerHTML={{ __html: f.body }} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* how it works */}
        <section id="how" className="pt-24">
          <Kicker>how it works</Kicker>
          <h2 className="text-balance text-[clamp(28px,4.5vw,42px)] font-bold tracking-tight">
            Zero to a running serverless app in two minutes
          </h2>
          <div className="mt-11 grid grid-cols-1 gap-4.5 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} section={i === 0 ? "how" : undefined}>
                <div className="h-full rounded-[10px] border border-edge bg-panel p-5.5">
                  <span className="font-mono text-[13px] tracking-widest text-amber">0{i + 1}</span>
                  <h3 className="mb-2.5 mt-2 text-[16.5px] font-semibold">{s.title}</h3>
                  <pre className="mb-3 overflow-x-auto rounded-lg border border-edge bg-bg2 px-3.5 py-3 font-mono text-[12.5px] leading-[1.7]" dangerouslySetInnerHTML={{ __html: s.term }} />
                  <p className="text-sm text-dim">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* deep dives */}
          <div className="mt-16 grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <h3 className="mb-3 text-[clamp(21px,3vw,27px)] font-bold tracking-tight">Debug with time travel, not print statements</h3>
              <p className="mb-2.5 max-w-[52ch] text-dim">
                A weird payload crashed your worker yesterday. With pulse it isn&apos;t gone: every
                trigger is recorded, byte for byte.
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-dim">
                <li><code className="font-mono text-[13px] text-amber-soft">pulse events</code> — the project&apos;s history, with outcomes</li>
                <li><code className="font-mono text-[13px] text-amber-soft">pulse logs --request &lt;id&gt;</code> — one request&apos;s whole story</li>
                <li><code className="font-mono text-[13px] text-amber-soft">pulse events replay &lt;id&gt;</code> — fire the exact payload at your fixed code</li>
              </ul>
            </Reveal>
            <Reveal>
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-[10px] border border-edge bg-bg2 px-5 py-4.5 font-mono text-[12.8px] leading-[1.75]" dangerouslySetInnerHTML={{ __html: replayShot }} />
            </Reveal>
          </div>

          <div className="mt-16 grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <Reveal className="lg:order-1">
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-[10px] border border-edge bg-bg2 px-5 py-4.5 font-mono text-[12.8px] leading-[1.75]" dangerouslySetInnerHTML={{ __html: monitorShot }} />
            </Reveal>
            <Reveal className="lg:order-2">
              <h3 className="mb-3 text-[clamp(21px,3vw,27px)] font-bold tracking-tight">One screen that answers &ldquo;what&apos;s happening?&rdquo;</h3>
              <p className="mb-2.5 max-w-[52ch] text-dim">
                <code className="font-mono text-[13px] text-amber-soft">pulse monitor</code> is a full-screen cockpit: every function with its
                success/failure counts, queue depths refreshing live — a dead-letter queue holding
                messages turns red — and the log stream with incremental filtering.
              </p>
              <p className="max-w-[52ch] text-dim">Arrow onto any recorded event and press Enter to replay it. The outcome lands in the footer.</p>
            </Reveal>
          </div>
        </section>

        {/* templates */}
        <section id="templates" className="pt-24">
          <Kicker>templates</Kicker>
          <h2 className="text-balance text-[clamp(28px,4.5vw,42px)] font-bold tracking-tight">A learning path, not a pile of boilerplate</h2>
          <p className="mt-4 max-w-[62ch] text-[clamp(16px,2.2vw,19px)] text-dim">
            Each starter adds exactly one concept. All ship in Python and Node, use the plain AWS
            SDK, and run unchanged in real AWS.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map(([name, body]) => (
              <Reveal key={name}>
                <div className="h-full rounded-[10px] border border-edge bg-panel p-6">
                  <b className="font-mono text-sm font-medium text-amber">{name}</b>
                  <p className="mt-2 text-[14.5px] text-dim">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* compare */}
        <section id="compare" className="pt-24">
          <Kicker>compare</Kicker>
          <h2 className="text-balance text-[clamp(28px,4.5vw,42px)] font-bold tracking-tight">Built for the inner loop</h2>
          <Reveal section="compare">
            <div className="mt-10 overflow-x-auto rounded-[10px] border border-edge">
              <table className="w-full min-w-[640px] border-collapse text-[14.5px] tabular-nums">
                <thead>
                  <tr className="bg-panel text-dim">
                    <th className="px-4.5 py-3 text-left font-medium"></th>
                    <th className="px-4.5 py-3 text-left font-medium text-amber">pulse</th>
                    <th className="px-4.5 py-3 text-left font-medium">sam local</th>
                    <th className="px-4.5 py-3 text-left font-medium">LocalStack</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row[0]}>
                      <td className="border-t border-edge px-4.5 py-3 text-dim">{row[0]}</td>
                      <td className="border-t border-edge px-4.5 py-3 font-medium">{row[1]}</td>
                      <td className="border-t border-edge px-4.5 py-3 text-dim">{row[2]}</td>
                      <td className="border-t border-edge px-4.5 py-3 text-dim">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p className="mt-6 max-w-[66ch] text-[clamp(16px,2.2vw,19px)] text-dim">
            Different tools for different jobs. LocalStack emulates ~100 services and tests your
            infrastructure code; SAM deploys. pulse owns the five hundred iterations before staging —
            and pairs with either at deploy time, because your code is vanilla SDK throughout.
          </p>
          <Reveal>
            <div className="mt-9 max-w-[66ch] border-l-[3px] border-amber py-1 pl-6 text-dim">
              <b className="text-fg">Honesty by design.</b> pulse does one workflow completely — CRUD
              APIs with background jobs (HTTP, SQS, DynamoDB, Lambda). Everything outside that subset
              fails loudly with a message saying exactly what isn&apos;t supported. Never silently
              wrong. S3, SNS, EventBridge, Step Functions: on the roadmap, not pretended.
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section id="get-started" className="pt-24">
          <Reveal section="get-started">
            <div className="rounded-2xl border border-edge bg-gradient-to-b from-panel to-bg2 px-7 py-14 text-center">
              <Kicker>get started</Kicker>
              <h2 className="text-balance text-[clamp(28px,4.5vw,42px)] font-bold tracking-tight">Your local cloud, one command away</h2>
              <div className="mt-6">
                <CopyInstall command={BREW} method="brew" />
              </div>
              <p className="mt-4 text-sm text-dim">
                or <code className="font-mono text-[13px] text-fg">curl -fsSL https://raw.githubusercontent.com/geetnsh2k1/pulse/master/scripts/install.sh | sh</code>
                <br />
                or <code className="font-mono text-[13px] text-fg">go install github.com/geetnsh2k1/pulse/cmd/pulse@latest</code>
              </p>
              <p className="mt-4 text-sm text-dim">
                then: <code className="font-mono text-[13px] text-amber">pulse tour</code> — five minutes, hands-on, nothing simulated.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      {/* footer */}
      <footer className="mt-24 border-t border-edge bg-bg2">
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-8 px-6 py-13 md:grid-cols-4">
          <div>
            <span className="whitespace-pre font-mono text-[13px] leading-[1.1] text-amber">{wave}</span>
            <p className="mt-3 max-w-[34ch] text-sm text-dim">
              The missing dev server for AWS serverless. Run the whole app locally, in milliseconds.
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-dim">{col.title}</h4>
              {col.links.map(([label, href]) => (
                <TrackLink key={label} href={href} event="outbound" props={{ target: label.toLowerCase() }}
                  className="my-2 block text-[14.5px] text-fg/85 hover:text-amber">
                  {label}
                </TrackLink>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-[1120px] flex-wrap gap-5 border-t border-edge px-6 py-5 pb-7 text-[13px] text-dim">
          <span>Apache-2.0 © Geetansh Garg</span>
          <span>Not affiliated with Amazon Web Services. AWS, Lambda, SQS, and DynamoDB are trademarks of Amazon.com, Inc.</span>
        </div>
      </footer>
    </>
  );
}

/* ---- content data ---- */

const icon = (path: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-[26px] w-[26px]" aria-hidden="true">
    <path d={path} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const features = [
  { title: "Millisecond inner loop", icon: icon("M13 2 4 14h6l-1 8 9-12h-6l1-8z"),
    body: 'Engine ready in ~100 ms, warm invokes in ~17 ms — enforced by CI, not just claimed. Restarts don&apos;t exist: code and <code class="font-mono text-[13px] text-amber-soft">pulse.yaml</code> apply live.' },
  { title: "The async loop, actually local", icon: icon("M4 7h13l-3-3M20 17H7l3 3"),
    body: 'Queues deliver to workers with visibility timeouts, automatic retries, and dead-letter queues — the part <code class="font-mono text-[13px] text-amber-soft">sam local</code> can&apos;t run at all — in one console.' },
  { title: "Time travel debugging", icon: icon("M12 8v4l3 2M3.5 12a8.5 8.5 0 1 0 2-5.5M3 4v4h4"),
    body: 'Every trigger is recorded with its exact payload. Replay yesterday&apos;s crashing request against today&apos;s fix: <code class="font-mono text-[13px] text-amber-soft">pulse events replay</code>.' },
  { title: "A live dashboard", icon: icon("M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM7 9l3 3-3 3M13 15h4"),
    body: '<code class="font-mono text-[13px] text-amber-soft">pulse monitor</code>: functions with ✓/✗ counts, live queue depths, streaming filtered logs, Enter-to-replay history.' },
  { title: "Real data, inspectable", icon: icon("M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5"),
    body: 'Tables and queues persist across restarts. Browse items with <code class="font-mono text-[13px] text-amber-soft">pulse tables</code>, peek queued messages without consuming them.' },
  { title: "A CLI that teaches", icon: icon("M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zm0 0a2 2 0 0 0 2 2h13M9 7h6"),
    body: 'Run any command bare and it asks instead of erroring. Errors ship their fix. <code class="font-mono text-[13px] text-amber-soft">pulse tour</code> teaches the whole model in five minutes.' },
];

const steps = [
  { title: "Create a project",
    term: '<span class="text-amber">$ pulse init</span>\n<span class="text-dim">? project name › shop\n? template › api-and-worker ★\n? language › python</span>\n<span class="text-tgreen">✓ created · deps installed</span>',
    body: "Three questions. Working sample code, dependencies auto-installed — or script it all with flags." },
  { title: "Start your local cloud",
    term: '<span class="text-amber">$ pulse start</span>\n<span class="text-amber">⚡ pulse</span> — <b>shop</b>\n<span class="text-dim">api     localhost:3000\nroutes  POST /orders → createOrder</span>\n<span class="text-tgreen">ready in 99ms</span> <span class="text-dim">— edits apply live</span>',
    body: "Routes answer, queues deliver, tables exist. Leave it running; it narrates everything." },
  { title: "Build like it's a web app",
    term: '<span class="text-amber">$ curl -X POST :3000/orders -d \'…\'</span>\n<span class="text-dim">201 {"status":"pending"}</span>\n<span class="text-tcyan">⚙ order-events → worker · ok</span>\n<span class="text-amber">$ curl :3000/orders/e9b4…</span>\n{"status":<span class="text-tgreen">"processed"</span>}',
    body: "Save a file — the next request runs the new code. The same code deploys with SAM or CDK, unchanged." },
];

const replayShot = '<span class="text-amber">$ pulse logs --request d90e5295</span>\n<span class="text-amber">⚡ request</span> <b>d90e5295</b> <span class="text-tcyan">sqs</span> <span class="text-dim">→</span> processWebhook · <span class="text-tred">error</span> <span class="text-dim">· 2ms</span>\n\n<span class="text-amber">event</span>   <span class="text-dim">{"Records":[{"body":"{\\"id\\":\\"3625…\\",\\"fail\\":true}"…</span>\n<span class="text-amber">error</span>   <span class="text-tred">RuntimeError: webhook 3625… failed (attempt 3)</span>\n\n<span class="text-dim">re-run it: </span><span class="text-amber">pulse events replay d90e5295</span>\n<span class="text-amber">$ pulse events replay d90e5295</span>\n<span class="text-tgreen">✓ processWebhook · success · 0ms</span>';

const monitorShot = '<span class="text-amber">⚡ pulse</span> <b>shop</b> · <span class="text-tgreen">● live</span>\n<span class="text-amber">functions</span>            <span class="text-amber">logs</span> <span class="text-dim">— / filters</span>\n createOrder <span class="text-dim">12✓</span>      <span class="text-dim">14:02</span> createOrder <span class="text-dim">|</span> order saved\n worker      <span class="text-dim">11✓</span> <span class="text-tred">1✗</span>   <span class="text-dim">14:02</span> <span class="text-tcyan">⚙ order-events → worker</span>\n<span class="text-amber">queues</span>               <span class="text-dim">14:02</span> worker <span class="text-dim">|</span> processed\n order-events <span class="text-dim">0·0·0</span>\n orders-dlq   <span class="text-tred">1·0·0 !</span>\n<span class="text-amber">events</span> <span class="text-dim">— ↑↓ · Enter replays</span>\n<span class="text-amber">▸</span> <b>8931cf5b</b> sqs → worker · <span class="text-tred">error</span>';

const templates: [string, string][] = [
  ["hello", "One function behind GET /hello — the smallest start."],
  ["todo-api", "Real CRUD on one table: create, list, complete, delete."],
  ["webhook-relay", "Ack-fast webhooks with retries and a dead-letter queue."],
  ["api-and-worker ★", "Everything together: API + queue + worker + table."],
];

const compare: [string, string, string, string][] = [
  ["Cold start to working", "~100 ms", "container per invoke", "10–30 s container"],
  ["Code change", "save → done", "mostly re-invoke", "redeploy / config"],
  ["Queue → worker → DLQ locally", "✓ out of the box", "not available", "via deploy cycle"],
  ["Event replay & request stories", "✓ built in", "—", "—"],
  ["Requirements", "one 20 MB binary", "Docker", "Docker, GB-scale image"],
  ["Data persists across restarts", "✓ free, default", "n/a", "paid tier"],
];

const footerCols = [
  { title: "Product", links: [["Features", "#features"], ["Compare", "#compare"], ["Releases", `${GH}/releases`]] as [string, string][] },
  { title: "Docs", links: [["The guide", `${GH}/blob/master/docs/GUIDE.md`], ["Quickstart", `${GH}#two-minutes-to-a-running-app`], ["Cheat sheet", `${GH}/blob/master/docs/GUIDE.md#7-command-cheat-sheet`]] as [string, string][] },
  { title: "Community", links: [["GitHub", GH], ["Issues", `${GH}/issues`]] as [string, string][] },
];
