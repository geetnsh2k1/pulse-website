import type { MetadataRoute } from "next";

const SITE = "https://getpulse.run";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), priority: 1 },
    { url: `${SITE}/vs/localstack`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE}/vs/sam-local`, lastModified: new Date(), priority: 0.8 },
  ];
}
