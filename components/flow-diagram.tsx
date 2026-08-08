import { Fragment } from "react";

// The architecture, animated: amber packets flow across the whole request
// path. Server component — the motion is pure CSS (.qdot), the labels are
// plain crawlable text. On small screens the connectors become ↓ arrows.

const NODES: [string, string][] = [
  ["your request", "curl :3000"],
  ["gateway", "API Gateway events"],
  ["Lambda fn", "real Runtime API"],
  ["SQS queue", "retries · DLQ"],
  ["worker fn", "background job"],
  ["DynamoDB", "SQLite on disk"],
];

export function FlowDiagram({ compact = false }: { compact?: boolean }) {
  if (compact) {
    // slim one-line strip (hero): labels only, packets flowing between
    return (
      <div className="flex items-center">
        {NODES.map(([title], i) => (
          <Fragment key={title}>
            <span className="shrink-0 font-mono text-[11.5px] text-dim">{title}</span>
            {i < NODES.length - 1 && (
              <div className="qtrack h-4 min-w-5 flex-1 self-center border-b border-dashed border-edge2">
                <span className="qdot" style={{ animationDelay: `${i * 0.5}s` }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1.5 lg:flex-row lg:items-stretch lg:gap-0">
      {NODES.map(([title, sub], i) => (
        <Fragment key={title}>
          <div className="w-full rounded-xl border border-edge bg-bg2 px-4 py-3 text-center font-mono lg:w-auto lg:min-w-[118px] lg:shrink-0">
            <b className="block text-[12.5px] font-semibold text-fg">{title}</b>
            <span className="mt-0.5 block text-[10.5px] text-faint">{sub}</span>
          </div>
          {i < NODES.length - 1 && (
            <>
              <div className="qtrack hidden min-w-7 flex-1 self-center border-b border-dashed border-edge2 lg:block lg:h-5">
                <span className="qdot" style={{ animationDelay: `${i * 0.5}s` }} />
              </div>
              <span aria-hidden="true" className="font-mono text-[13px] text-amber/50 lg:hidden">↓</span>
            </>
          )}
        </Fragment>
      ))}
    </div>
  );
}
