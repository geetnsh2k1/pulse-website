import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://pulse-website-red-two.vercel.app", lastModified: new Date(), priority: 1 }];
}
