import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("terminal cursor styles", () => {
  it("defines its blink keyframes in the same CSS module as the animation", () => {
    const css = readFileSync(
      join(process.cwd(), "components", "terminal-line.module.css"),
      "utf8",
    );

    expect(css).toMatch(/@keyframes\s+terminalBlink/);
    expect(css).toMatch(/animation:\s*terminalBlink/);
  });

  it("uses an underscore while idle and a block while focused", () => {
    const css = readFileSync(
      join(process.cwd(), "components", "terminal-line.module.css"),
      "utf8",
    );

    expect(css).toMatch(
      /\.cursor\[data-blinking="false"\]\s*{[\s\S]*?height:\s*0\.12em;[\s\S]*?align-self:\s*flex-end;/,
    );
    expect(css).toMatch(
      /\.cursor\[data-blinking="true"\]\s*{[\s\S]*?height:\s*1\.15em;/,
    );
  });
});
