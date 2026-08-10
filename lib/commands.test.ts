import { describe, expect, it } from "vitest";

import {
  commandHelp,
  supportedCommands,
  terminalCommands,
} from "@/lib/commands";

describe("terminal command registry", () => {
  it("advertises only implemented commands", () => {
    expect(supportedCommands).toEqual([
      "home",
      "about",
      "experience",
      "education",
      "projects",
      "snake",
      "help",
      "nav",
      "theme",
      "theme catppuccin",
      "theme catppuccin-light",
      "theme tokyo-night",
      "theme gruvbox",
      "theme nord",
      "theme ayu",
      "cowsay",
      "philosophy",
      "ls",
      "clear",
    ]);
  });

  it("derives autocomplete and help entries from the command registry", () => {
    expect(supportedCommands).toEqual(
      terminalCommands.flatMap((command) => command.autocomplete),
    );
    expect(commandHelp).toEqual(
      terminalCommands.flatMap((command) => command.help),
    );
  });

  it("keeps command-only routes out of button navigation", async () => {
    const { navigationButtonCommands } = await import("@/lib/commands");

    expect(navigationButtonCommands.map((command) => command.name)).not.toContain(
      "snake",
    );
  });
});
