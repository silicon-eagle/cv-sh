import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("terminal shell styles", () => {
  const css = readFileSync(
    join(process.cwd(), "components", "terminal-shell.module.css"),
    "utf8",
  );

  it("fills the available viewport height", () => {
    expect(css).toMatch(
      /\.terminal\s*{[\s\S]*?min-height:\s*calc\(100svh - 1\.5rem\);/,
    );
  });
});
