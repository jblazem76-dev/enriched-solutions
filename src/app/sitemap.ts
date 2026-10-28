import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "/",
  "/ekg",
  "/ekg/book",
  "/es-plus",
  "/es-plus/waitlist",
  "/golf-and-heels",
  "/golf-and-heels/interest",
  "/consulting",
  "/speaking",
  "/retreat",
  "/about",
];

// Privacy and Terms are placeholders (noindex) and are left out until they are real.
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" || route === "/ekg" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/ekg" ? 0.9 : 0.7,
  }));
}
