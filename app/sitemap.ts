import type { MetadataRoute } from "next"
import { posts } from "@/lib/site-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wolfitpark.online"

  const routes = [
    "", "about", "services", "solutions", "industries", "pricing",
    "case-studies", "portfolio", "products", "blog", "resources",
    "documentation", "api-documentation", "security", "trust-center",
    "system-status", "partners", "support", "faq", "contact",
    "book-demo", "careers", "testimonials",
    "privacy", "terms", "cookies", "refund", "shipping", "accessibility",
    "incorporate", "incorporate/states", "incorporate/pricing",
    "dashboard",
    "consultation",
  ]

  return [
    ...routes.map((route) => ({
      url: `${base}/${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "services" || route === "pricing" ? 0.9 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
