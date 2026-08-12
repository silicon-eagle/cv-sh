import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("terminal shell styles", () => {
  const css = readFileSync(
    join(process.cwd(), "components", "terminal-shell.module.css"),
    "utf8",
  );

  it("stays fixed to the available viewport height", () => {
    expect(css).toMatch(
      /\.terminal\s*{[\s\S]*?height:\s*calc\(100svh - 1\.5rem\);/,
    );
  });

  it("keeps overflow inside the shell content", () => {
    expect(css).toMatch(
      /\.content\s*{[\s\S]*?min-height:\s*0;[\s\S]*?overflow:\s*hidden;/,
    );
  });
});
