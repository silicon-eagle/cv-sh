import { describe, expect, it } from "vitest";

describe("robots metadata", () => {
  it("allows normal indexing while blocking AI training crawlers", async () => {
    const robotsModule = await import("./robots").catch(() => undefined);

    expect(robotsModule).toBeDefined();

    const metadata = robotsModule?.default();

    expect(metadata?.rules).toEqual([
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "CCBot",
          "Bytespider",
          "PerplexityBot",
          "Amazonbot",
          "Applebot-Extended",
        ],
        disallow: "/",
      },
    ]);
  });
});
