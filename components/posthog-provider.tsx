"use client";

// PostHog wiring: initializes only when NEXT_PUBLIC_POSTHOG_KEY is set, so
// local builds and previews work without an account. Pageviews are captured
// automatically; custom events go through track() below.
import posthog from "posthog-js";
import { useEffect } from "react";

let initialized = false;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || initialized) return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false, // we send deliberate events only
      respect_dnt: true,
    });
    initialized = true;
  }, []);
  return <>{children}</>;
}

export function track(event: string, props?: Record<string, string>) {
  if (initialized) posthog.capture(event, props);
}
