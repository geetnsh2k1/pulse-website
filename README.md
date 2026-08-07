# pulse-website

The public site for [pulse](https://github.com/geetnsh2k1/pulse) — Next.js 15
(App Router) + Tailwind v4, deployed on Vercel, analytics via PostHog.

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
| `$pageview` / `$pageleave` | — | visits, referrers, UTM |
| `copy_install` | `method: brew` | THE conversion — install command copied |
| `cta_click` | `target` | Get started / GitHub buttons |
| `outbound` | `target` | docs / releases / github links |
| `section_view` | `section: how·compare·get-started` | scroll-depth funnel |

Suggested funnel in PostHog: `$pageview → section_view(get-started) →
copy_install`.

## After deploy

- Update `SITE` in `app/layout.tsx` (and sitemap/robots URLs) when the
  final domain lands.
- Replace the GitHub Pages page in the pulse repo (`docs/index.html`) with
  a redirect to this site.
