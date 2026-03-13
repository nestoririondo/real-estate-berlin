import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://realestateinberlin.nestoririondo.com";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/properties", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) =>
    staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  );
}
