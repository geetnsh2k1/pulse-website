// The social card, generated from code so it follows the design instead of
// drifting from it. Shared by app/opengraph-image.tsx and app/twitter-image.tsx.
//
// This runs through Satori, not a browser, so the rules are narrower than CSS:
//   - flexbox and absolute positioning only — no grid, no floats
//   - a div with multiple *element* children needs an explicit display:flex
//   - a div holding text (with inline <span>s) must NOT be flex, or wrapping breaks
//   - ttf/otf/woff only, and the whole bundle — JSX, fonts, assets — caps at 500KB
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "pulse — the dev server AWS Lambda never had: run Lambda, SQS and DynamoDB locally without Docker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_DIR = join(process.cwd(), "assets", "fonts");
const [poppinsBold, poppinsRegular] = await Promise.all([
  readFile(join(FONT_DIR, "Poppins-Bold.ttf")),
  readFile(join(FONT_DIR, "Poppins-Regular.ttf")),
]);

// same tokens as globals.css — keep in step
const BG = "#0b0c10";
const FG = "#e9e7e1";
const DIM = "#9297ab";
const FAINT = "#828799";
const AMBER = "#ffab33";
const INK = "#131313";
const EDGE = "#262935";

const STATS: [string, string][] = [
  ["99 ms", "engine ready"],
  ["17 ms", "warm invoke"],
  ["50 MB", "whole app"],
  ["$0", "to build"],
];

export function ogCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "62px 68px",
          fontFamily: "Poppins",
          position: "relative",
        }}
      >
        {/* the hero's amber wash, same geometry as the page */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: 0,
            width: 1200,
            height: 620,
            background:
              "radial-gradient(52% 50% at 50% 0%, rgba(255,171,51,0.20), rgba(255,171,51,0) 70%)",
          }}
        />

        {/* lockup */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="60" height="60" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="18" fill={AMBER} />
            <path
              d="M11 34 H23 L28 22 L36 44 L41 34 H53"
              fill="none"
              stroke={INK}
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              marginLeft: 18,
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: FG,
            }}
          >
            pulse
          </span>
        </div>

        {/* Headline. Satori counts text-plus-span as multiple children and then
            demands display:flex, which destroys text wrapping — so the two
            lines are set by hand. On a fixed 1200×630 canvas that's an
            advantage: the break lands where we want it, and the amber word
            opens the second line. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // 54px, measured: line one is 1011px inside a 1064px box. At 58 it
              // was 1086 and wrapped, orphaning "DynamoDB".
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: FG,
            }}
          >
            <span>Run AWS Lambda, SQS and DynamoDB</span>
            <div style={{ display: "flex" }}>
              <span style={{ color: AMBER }}>locally</span>
              {/* a real space is 9px at this size — 16 read as a double space */}
              <span style={{ marginLeft: 10 }}>— without Docker</span>
            </div>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 29,
              fontWeight: 400,
              lineHeight: 1.45,
              color: DIM,
              // no cap: it measures 986px and wants the full 1064 to stay on one line
            }}
          >
            The dev server AWS Lambda never had. No Docker, no AWS account.
          </div>
        </div>

        {/* the numbers, above a hairline */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `1px solid ${EDGE}`,
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex" }}>
            {STATS.map(([value, label], i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: i === 0 ? 0 : 62,
                }}
              >
                <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.03em", color: AMBER }}>
                  {value}
                </span>
                <span style={{ marginTop: 4, fontSize: 20, fontWeight: 400, color: FAINT }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 21, fontWeight: 400, color: FAINT }}>Apache-2.0 · getpulse.run</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
        { name: "Poppins", data: poppinsRegular, weight: 400, style: "normal" },
      ],
    }
  );
}
