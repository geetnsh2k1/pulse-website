# pulse-website

The public site for [pulse](https://github.com/geetnsh2k1/pulse) — Next.js
(App Router) + Tailwind v4, deployed on Vercel, analytics via PostHog.
Live: https://getpulse.run

Design system: dark + amber "signal" theme — animated ECG pulse-line motif,
dot-grid + grain texture, bento feature grid with cursor spotlight, an
auto-playing How-it-works stepper, and a tabbed terminal showcase. Every
terminal frame on the page is verbatim CLI output, never a mockup.
Scroll-reveal is progressive enhancement (`html.js` gate): with JS disabled
the full page is still visible.

## Develop

```bash
npm install
npm run dev        # localhost:3000
```

## Deploy (one-time setup)

1. Create a GitHub repo `pulse-website` and push this folder.
2. vercel.com → Add New → Project → import the repo (defaults are correct).
3. Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_POSTHOG_KEY` — from posthog.com → Project settings
   - `NEXT_PUBLIC_POSTHOG_HOST` — `https://us.i.posthog.com` (or EU host)
4. Every push to master deploys; PRs get preview URLs.

Analytics degrade gracefully: with no key set, the site works and simply
sends nothing.

## What gets tracked (PostHog)

Deliberate events only — autocapture is off:

| Event | Props | Meaning |
|---|---|---|
| `$pageview` / `$pageleave` | — | visits; referrer + `utm_*` captured automatically |
| `copy_install` | `method: brew·curl·go`, `location: cta` | THE conversion — install command copied, per method |
| `cta_click` | `cta: get-started·github`, `location: nav·hero·cta` | which door people choose, and where |
| `outbound` | `target` | interest depth: docs, guide, releases, issues, perf-ci, share-feedback, footer links |
| `section_view` | `section: switch·journey·features·how·inspect·why·use-cases·templates·compare·faq·testimonials·get-started` | scroll-milestone funnel — where the story loses people |
| `how_it_works_step` | `step: init·start·loop` | reader took manual control of the stepper |
| `inspect_tab` | `tab: story·replay·monitor·tables` | which observability capability pulls people in |

Visitors, geography, and device come free with `$pageview` (PostHog → Web
analytics). Referrers and UTM tags are automatic — tag launch links like
`?utm_source=hn`.

Suggested funnel in PostHog: `$pageview → section_view(get-started) →
copy_install`. Break `copy_install` down by `method` to see brew vs curl
vs go.

## After deploy

- Update `SITE` in `app/layout.tsx` (and sitemap/robots URLs) when the
  final domain lands.
- Replace the GitHub Pages page in the pulse repo (`docs/index.html`) with
  a redirect to this site.
