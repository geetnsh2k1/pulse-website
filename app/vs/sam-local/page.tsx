import type { Metadata } from "next";
import { VsPage, type VsData } from "@/components/vs-page";

export const metadata: Metadata = {
  title: "pulse vs sam local — Hot Reload & Queues for Lambda Dev",
  description:
    "AWS SAM local vs pulse for Lambda development: continuous local cloud vs per-invoke containers, SQS workers, hot reload, event replay — and why you keep sam deploy.",
  alternates: { canonical: "/vs/sam-local" },
};

const data: VsData = {
  slug: "sam-local",
  competitor: "sam local",
  h1: "pulse vs sam local",
  verdict:
    "They do different jobs — and you'll likely keep both. SAM is a deployment toolchain whose local mode spins up a Docker container per invocation. pulse is a long-lived local cloud: your API answers, SQS queues deliver to workers, DynamoDB tables persist — continuously, natively, with hot reload and event replay. Build against pulse all day; ship with sam deploy, unchanged.",
  pulseIf: [
    "you want the whole app running locally — API + queues + workers + tables, not one invoke at a time",
    "you want the SQS → worker → dead-letter-queue loop, which sam local can't run",
    "you want instant hot reload instead of container spin-up per invocation",
    "you want to replay yesterday's exact event against today's code",
    "you want to peek queues and browse tables without the AWS console",
  ],
  themIf: [
    "you're deploying — that's SAM's actual job, and pulse never replaces it",
    "you're validating template.yaml / CloudFormation behavior",
    "per-invoke container parity matters more to you than iteration speed",
    "an occasional single `sam local invoke` covers your workflow",
  ],
  bars: [
    { label: "feedback after a code change", pulse: ["17 ms invoke", "2%"], them: ["container per invoke", "100%"] },
    { label: "memory while developing", pulse: ["~50 MB", "4%"], them: ["100s of MB", "100%"] },
  ],
  rows: [
    ["Runs the whole app continuously", "✓ API + queues + workers + tables", "not available"],
    ["Cold start to working", "~100 ms", "container per invoke"],
    ["Code change", "save → done", "mostly re-invoke"],
    ["Queue → worker → DLQ loop", "✓ out of the box", "not available"],
    ["Event replay & request stories", "✓ built in", "—"],
    ["Deploys to AWS", "no — by design, keep sam deploy", "✓ its real job"],
    ["Requirements", "one 20 MB binary", "Docker"],
    ["Data persists across restarts", "✓ free, default", "n/a"],
  ],
  useBoth:
    "pulse and SAM aren't rivals — they're two halves of one workflow. pulse is the dev server for the five hundred iterations between idea and staging; SAM is how the result ships. Your handlers are plain AWS SDK code with zero pulse imports, so `sam deploy` takes exactly what ran locally. Nothing to remove, nothing to translate.",
  otherHref: "/vs/localstack",
  otherLabel: "pulse vs LocalStack",
};

export default function Page() {
  return <VsPage data={data} />;
}
