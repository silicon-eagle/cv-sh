import { describe, expect, it } from "vitest";

import {
  autocompleteCommand,
  parseCommand,
  promptPath,
} from "@/lib/terminal";

describe("terminal utilities", () => {
  it("normalizes whitespace and parses a command", () => {
    expect(parseCommand("  theme   tokyo-night ")).toEqual({
      name: "theme",
      argument: "tokyo-night",
      normalized: "theme tokyo-night",
    });
  });

  it.each([
    ["/", "~"],
    ["/about", "~/about"],
    ["/help", "~/help"],
  ])("maps %s to the terminal prompt", (pathname, expected) => {
    expect(promptPath(pathname)).toBe(expected);
  });

  it("completes a unique command", () => {
    expect(autocompleteCommand("abo")).toBe("about");
  });

  it("completes to the shared prefix for multiple matches", () => {
    expect(autocompleteCommand("theme ")).toBe("theme ");
    expect(autocompleteCommand("theme t")).toBe("theme tokyo-night");
  });

  it("leaves unknown input unchanged", () => {
    expect(autocompleteCommand("projects")).toBe("projects");
  });
});
