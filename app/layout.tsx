import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

// display "optional": if the webfont isn't ready within the swap window the
// fallback stays — no mid-view font swap, no layout shift on the big
// headline (Lighthouse flagged CLS 0.11 from exactly that).
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "optional" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "optional" });

const SITE = "https://www.getpulse.run";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  alternates: {
    canonical: "/",
    languages: { en: "/", "x-default": "/" },
  },
  title: "pulse — Run AWS Lambda, SQS & DynamoDB Locally, No Docker",
  description:
    "Run AWS Lambda, SQS and DynamoDB locally — no Docker. Hot reload, event replay, queues and workers in a fast local dev server.",
  keywords: [
    "local aws lambda", "aws lambda locally", "run aws lambda without docker",
    "local serverless development", "aws lambda emulator", "lambda runtime api",
    "local sqs", "local dynamodb", "localstack alternative", "sam local alternative",
    "debug aws lambda locally", "hot reload lambda", "event replay lambda",
    "serverless dev server", "boto3 local", "aws sdk local",
  ],
  openGraph: {
    title: "pulse — Run AWS Lambda, SQS & DynamoDB Locally, No Docker",
    description:
      "The dev server AWS Lambda never had: hot reload, real SQS queues, local DynamoDB, event replay. No Docker, no AWS account.",
    url: SITE,
    siteName: "pulse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pulse — Run AWS Lambda, SQS & DynamoDB Locally, No Docker",
    description:
      "The dev server AWS Lambda never had: hot reload, real SQS queues, local DynamoDB, event replay. No Docker, no AWS account.",
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
