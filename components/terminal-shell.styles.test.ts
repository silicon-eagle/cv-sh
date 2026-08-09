import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("terminal shell styles", () => {
  const css = readFileSync(
    join(process.cwd(), "components", "terminal-shell.module.css"),
    "utf8",
  );

  it("keeps the terminal area at a fixed height", () => {
    expect(css).toMatch(
      /\.terminalArea\s*{[\s\S]*?height:\s*12rem;[\s\S]*?flex:\s*0 0 12rem;/,
    );
  });

  it("scrolls command history independently", () => {
    expect(css).toMatch(
      /\.output\s*{[\s\S]*?overflow-y:\s*auto;/,
    );
  });
});
