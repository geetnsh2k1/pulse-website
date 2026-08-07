import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const SITE = "https://pulse-website-red-two.vercel.app"; // update when the domain lands

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "pulse — the missing dev server for AWS serverless",
  description:
    "Run your whole serverless app — API, queues, workers, DynamoDB — natively on your laptop in milliseconds. No Docker, no AWS account. Open source, Apache-2.0.",
  keywords: [
    "aws", "serverless", "lambda", "local development", "dynamodb local",
    "sqs local", "sam local alternative", "localstack alternative", "dev server",
  ],
  openGraph: {
    title: "pulse — the missing dev server for AWS serverless",
    description:
      "Your whole serverless app running locally in milliseconds. No Docker, no AWS account.",
    url: SITE,
    siteName: "pulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pulse — the missing dev server for AWS serverless",
    description:
      "Your whole serverless app running locally in milliseconds. No Docker, no AWS account.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds .js to <html>
    // before hydration (progressive enhancement) — that class delta is the
    // only expected mismatch on this element.
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${jetbrains.variable}`}>
      <head>
        {/* Progressive enhancement flag: scroll-reveal styles only apply when
            JS actually runs (html.js), so crawlers, reader mode, and no-JS
            visitors always see the full page. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
      </head>
      <body className="font-sans antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
