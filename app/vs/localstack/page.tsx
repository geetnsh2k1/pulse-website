import type { Metadata } from "next";
import { VsPage, type VsData } from "@/components/vs-page";

export const metadata: Metadata = {
  title: "pulse vs LocalStack — Fast Local AWS Dev Without Docker",
  description:
    "An honest LocalStack alternative comparison: startup time, memory, hot reload, event replay — and when LocalStack is still the right choice.",
  alternates: { canonical: "/vs/localstack" },
};

const data: VsData = {
  slug: "localstack",
  competitor: "LocalStack",
  h1: "pulse vs LocalStack",
  verdict:
    "Different tools for different jobs. LocalStack emulates ~100 AWS services inside Docker and shines at testing infrastructure code. pulse is a dev server: it runs the serverless inner loop — AWS Lambda, HTTP APIs, SQS queues, DynamoDB tables — natively on your laptop, in milliseconds, with hot reload and event replay. If your day is writing handler code, pulse is built for exactly that day.",
  pulseIf: [
    "you're building serverless apps on Lambda + HTTP + SQS + DynamoDB",
    "you want save-a-file → next-request-runs-new-code iteration",
    "you want event replay, request stories, and a live monitor",
    "you're on a laptop: one 20 MB binary, ~50 MB running, no Docker",
    "you're learning AWS and don't want an account or a bill",
  ],
  themIf: [
    "you need services pulse doesn't cover yet — S3, SNS, EventBridge, Step Functions, and ~90 more",
    "you're testing Terraform/CDK provisioning behavior itself",
    "your CI needs broad multi-service emulation in one container",
    "your team already runs established LocalStack workflows",
  ],
  bars: [
    { label: "cold start to working", pulse: ["99 ms", "2%"], them: ["10–30 s", "100%"] },
    { label: "memory while developing", pulse: ["~50 MB", "2.4%"], them: ["2 GB+", "100%"] },
  ],
  rows: [
    ["Services covered", "4, completely — Lambda · HTTP · SQS · DynamoDB", "~100, emulated in Docker"],
    ["Cold start to working", "~100 ms", "10–30 s container"],
    ["Code change", "save → done", "redeploy / config"],
    ["Queue → worker → DLQ loop", "✓ out of the box", "via deploy cycle"],
    ["Event replay & request stories", "✓ built in", "—"],
    ["Live monitor & tables browser", "✓ built in", "—"],
    ["Requirements", "one 20 MB binary", "Docker, GB-scale image"],
    ["Data persists across restarts", "✓ free, default", "paid tier"],
    ["Price", "free, Apache-2.0", "free tier + paid plans"],
  ],
  useBoth:
    "plenty of teams should run both. pulse owns the five hundred daily iterations while you write handlers; LocalStack (or a staging account) verifies infrastructure code before deploy. Your handlers are vanilla AWS SDK throughout, so choosing pulse for the inner loop locks you out of nothing — and when you touch a service pulse doesn't support, it fails loudly and tells you, instead of pretending.",
  otherHref: "/vs/sam-local",
  otherLabel: "pulse vs sam local",
};

export default function Page() {
  return <VsPage data={data} />;
}
