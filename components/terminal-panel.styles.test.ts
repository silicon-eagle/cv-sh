import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("terminal panel styles", () => {
  const css = readFileSync(
    join(process.cwd(), "components", "terminal-panel.module.css"),
    "utf8",
  );

  it("keeps the terminal panel at a fixed height", () => {
    expect(css).toMatch(/\.panel\s*{[\s\S]*?height:\s*14rem;/);
  });

  it("scrolls command history independently", () => {
    expect(css).toMatch(/\.output\s*{[\s\S]*?overflow-y:\s*auto;/);
  });
});
