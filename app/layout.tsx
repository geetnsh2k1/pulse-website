import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/posthog-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

const SITE = "https://pulse-website.vercel.app"; // update when the domain lands

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
    <html lang="en" className={`${geist.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
