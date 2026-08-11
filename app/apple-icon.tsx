// Home-screen icon, generated so it can't drift from the mark. Full-bleed
// amber rather than our rounded tile: iOS masks the corners itself, and a
// rounded square inside a rounded mask reads as a mistake. No text, so no
// fonts to load.
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffab33",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 64 64">
          <path
            d="M9 34 H22 L27.5 21 L36 45 L41.5 34 H55"
            fill="none"
            stroke="#131313"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
