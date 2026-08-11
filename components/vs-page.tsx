// Shared template for the /vs/* comparison pages. Same design system as the
// homepage, honest verdicts by construction: every page says plainly when
// the other tool is the right choice.
import Link from "next/link";

import { PulseLine } from "./pulse-line";
import { PulseLogo } from "./mark";
import { TrackLink, Reveal } from "./interactive";
import { InstallTabs } from "./install-tabs";

const GH = "https://github.com/geetnsh2k1/pulse";

export type VsBar = {
  label: string;
  pulse: [string, string]; // [display value, bar width %]
  them: [string, string];
};

export type VsData = {
  slug: string;
  competitor: string;
  h1: string;
  verdict: string;
  pulseIf: string[];
  themIf: string[];
  bars: VsBar[];
  rows: [string, string, string][];
  useBoth: string;
  otherHref: string;
  otherLabel: string;
};

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

export function VsPage({ data }: { data: VsData }) {
  return (
    <>
      {/* slim header */}
      <nav className="sticky top-0 z-50 border-b border-edge/70 bg-bg/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1000px] items-center gap-5 px-6">
          <Link href="/" aria-label="pulse — home">
            <PulseLogo markClass="h-[26px] w-[26px]" className="!text-[17px]" />
          </Link>
          <Link href="/" className="hidden text-[14px] text-dim transition-colors hover:text-fg sm:block">
            ← everything pulse does
          </Link>
          <div className="ml-auto">
            <TrackLink
              href={GH}
              event="cta_click"
              props={{ cta: "github", location: `vs-${data.slug}` }}
              className="btn btn-ghost !px-3.5 !py-2 text-[14px]"
            >
              GitHub
            </TrackLink>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1000px] px-6">
        {/* hero */}
        <header className="pt-16 md:pt-20">
          <p className="kick mb-4">an honest comparison</p>
          <h1 className="max-w-[24ch] text-balance text-[clamp(30px,5.4vw,54px)] font-bold leading-[1.06] tracking-[-0.02em]">
            {data.h1}
          </h1>
          <PulseLine crop="mid" className="mt-5 h-9 w-[min(360px,70%)]" />
          <p className="mt-5 max-w-[68ch] text-[clamp(15.5px,2vw,17.5px)] leading-relaxed text-dim">
            {data.verdict}
          </p>
        </header>

        {/* choose which */}
        <section className="pt-12 md:pt-16">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-amber/30 bg-panel p-6">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-amber">choose pulse if…</p>
                <ul className="mt-4 space-y-2.5 text-[14.5px] leading-snug text-dim">
                  {data.pulseIf.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <span className="shrink-0 text-tgreen">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="h-full rounded-xl border border-edge bg-bg2/60 p-6">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-dim">choose {data.competitor} if…</p>
                <ul className="mt-4 space-y-2.5 text-[14.5px] leading-snug text-dim">
                  {data.themIf.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <span className="shrink-0 text-faint">→</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* the gap, drawn */}
        <section className="pt-12 md:pt-16">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.bars.map((b) => (
                <div key={b.label} className="bento p-6">
                  <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">{b.label}</p>
                  <div className="mt-4 space-y-4 font-mono text-[12px]">
                    <div>
                      <div className="mb-1.5 flex justify-between"><span className="text-fg">pulse</span><b className="text-amber">{b.pulse[0]}</b></div>
                      <div className="h-2 rounded-full bg-bg">
                        <span className="bar bg-amber shadow-[0_0_8px_rgba(255,171,51,0.5)]" style={{ "--w": b.pulse[1], minWidth: 5 } as React.CSSProperties} />
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex justify-between text-dim"><span>{data.competitor}</span><span>{b.them[0]}</span></div>
                      <div className="h-2 rounded-full bg-bg">
                        <span className="bar bg-edge2" style={{ "--w": b.them[1] } as React.CSSProperties} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-faint">
              bars drawn to linear scale — the sliver is the point
            </p>
          </Reveal>
        </section>

        {/* detail table */}
        <section className="pt-12 md:pt-16">
          <Reveal>
            <div className="overflow-x-auto rounded-2xl border border-edge">
              <table className="w-full min-w-[560px] border-collapse text-[14.5px] tabular-nums">
                <thead>
                  <tr className="bg-panel text-dim">
                    <th className="px-5 py-3.5 text-left font-medium"></th>
                    <th className="border-x border-amber/15 bg-[rgba(255,171,51,0.07)] px-5 py-3.5 text-left font-semibold text-amber">pulse</th>
                    <th className="px-5 py-3.5 text-left font-medium">{data.competitor}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row) => (
                    <tr key={row[0]} className="transition-colors hover:bg-white/[0.02]">
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{row[0]}</td>
                      <td className="border-x border-amber/15 border-t border-edge bg-[rgba(255,171,51,0.05)] px-5 py-3.5 font-medium">
                        {row[1].startsWith("✓") ? (<><span className="text-tgreen">✓</span>{row[1].slice(1)}</>) : row[1]}
                      </td>
                      <td className="border-t border-edge px-5 py-3.5 text-dim">{gap(row[2])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* use both */}
        <section className="pt-10 md:pt-12">
          <div className="max-w-[68ch] rounded-r-xl border-l-[3px] border-amber bg-panel/50 py-4 pl-6 pr-5 text-[15px] leading-relaxed text-dim">
            <b className="text-fg">The honest version:</b> {data.useBoth}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20">
          <Reveal>
            <div className="rounded-3xl border border-edge bg-gradient-to-b from-panel to-bg2 px-5 py-12 text-center md:px-7">
              <p className="kick mb-4">try the fast half</p>
              <h2 className="text-balance text-[clamp(24px,3.6vw,36px)] font-bold tracking-tight">
                Your local cloud, one command away
              </h2>
              <div className="mt-7 flex justify-center">
                <InstallTabs location={`vs-${data.slug}`} />
              </div>
              <p className="mt-5 text-[14px] text-dim">
                then run <code className="font-mono text-[13px] text-amber">pulse tour</code> — five minutes, hands-on, nothing simulated
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[13px]">
                <Link className="text-amber transition-colors hover:text-amber-soft" href="/">everything pulse does →</Link>
                <Link className="text-amber transition-colors hover:text-amber-soft" href={data.otherHref}>{data.otherLabel} →</Link>
                <TrackLink
                  href={`${GH}/blob/master/docs/GUIDE.md`}
                  event="outbound"
                  props={{ target: `guide-vs-${data.slug}` }}
                  className="text-amber transition-colors hover:text-amber-soft"
                >
                  read the guide →
                </TrackLink>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-edge bg-bg2/70">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center gap-x-5 gap-y-2 px-6 py-6 text-[13px] text-faint">
          <Link href="/" aria-label="pulse — home">
            <PulseLogo markClass="h-[18px] w-[18px]" className="!gap-2 !text-[14px]" />
          </Link>
          <span>Apache-2.0 © Geetansh Garg</span>
          <span>Not affiliated with Amazon Web Services{data.competitor === "LocalStack" ? " or LocalStack GmbH" : ""}. All trademarks belong to their owners.</span>
        </div>
      </footer>
    </>
  );
}
