import type { MetadataRoute } from "next";

const aiCrawlerUserAgents = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "PerplexityBot",
  "Amazonbot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: aiCrawlerUserAgents,
        disallow: "/",
      },
    ],
  };
}
