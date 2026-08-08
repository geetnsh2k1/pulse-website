"use client";

// PostHog wiring: initializes only when NEXT_PUBLIC_POSTHOG_KEY is set, so
// local builds and previews work without an account. The library is
// dynamically imported AFTER hydration — analytics never costs the visitor
// startup time. Pageviews are captured automatically on init; custom events
// go through track() below.
import { useEffect } from "react";

type PostHog = (typeof import("posthog-js"))["default"];

let ph: PostHog | null = null;
let started = false;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || started) return;
    started = true;
    import("posthog-js").then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
        autocapture: false, // we send deliberate events only
        respect_dnt: true,
        disable_surveys: true, // don't load surveys.js (~33 KB we never use)
        capture_dead_clicks: false, // nor dead-clicks-autocapture.js
      });
      ph = posthog;
    });
  }, []);
  return <>{children}</>;
}

export function track(event: string, props?: Record<string, string>) {
  ph?.capture(event, props);
}
