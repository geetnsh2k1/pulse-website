import type { NextConfig } from "next";

// The installer lives in the CLI repo — one copy, versioned with the code that
// it installs. This proxies it under our own domain so the published command is
// `curl -fsSL https://getpulse.run/install.sh | sh` instead of a raw
// githubusercontent URL that wraps onto three lines on a phone.
//
// A rewrite, not a redirect: curl fetches and the user reads the same branded
// URL, and there is still only one source of truth to keep updated.
const INSTALL_SH =
  "https://raw.githubusercontent.com/geetnsh2k1/pulse/master/scripts/install.sh";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/install.sh", destination: INSTALL_SH }];
  },
};

export default nextConfig;
