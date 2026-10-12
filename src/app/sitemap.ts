import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { properties } from "@/data/properties";
import { facilities } from "@/data/facilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/spaces", "/facilities", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: path === "" || path === "/spaces" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/spaces" ? 0.9 : 0.6,
    })),
    ...properties.map((p) => ({ url: `${siteConfig.url}/spaces/${p.slug}`, lastModified: new Date(p.updatedAt), priority: 0.7 })),
    ...facilities.map((f) => ({ url: `${siteConfig.url}/facilities/${f.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
