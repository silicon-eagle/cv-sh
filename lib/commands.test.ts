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
      "projects",
      "help",
      "theme",
      "theme catppuccin",
      "theme tokyo-night",
      "theme gruvbox",
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
});
