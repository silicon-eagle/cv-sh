export const themeNames = ["catppuccin", "tokyo-night", "gruvbox"] as const;

export type ThemeName = (typeof themeNames)[number];

export const supportedCommands = [
  "home",
  "about",
  "help",
  "theme",
  ...themeNames.map((theme) => `theme ${theme}`),
  "clear",
] as const;

export type ParsedCommand = {
  name: string;
  argument?: string;
  normalized: string;
};

export function parseCommand(input: string): ParsedCommand {
  const normalized = input.trim().replace(/\s+/g, " ").toLowerCase();
  const [name = "", ...arguments_] = normalized.split(" ");
  const argument = arguments_.join(" ") || undefined;

  return { name, argument, normalized };
}

export function promptPath(pathname: string): string {
  return pathname === "/" ? "~" : `~${pathname.replace(/\/$/, "")}`;
}

function commonPrefix(values: readonly string[]): string {
  if (values.length === 0) return "";

  return values.slice(1).reduce((prefix, value) => {
    let index = 0;
    while (index < prefix.length && prefix[index] === value[index]) index += 1;
    return prefix.slice(0, index);
  }, values[0]);
}

export function autocompleteCommand(input: string): string {
  const normalized = input.toLowerCase();
  const matches = supportedCommands.filter((command) => command.startsWith(normalized));

  if (matches.length === 0) return input;
  if (matches.length === 1) return matches[0];
  return commonPrefix(matches);
}

export function isThemeName(value: string | undefined): value is ThemeName {
  return themeNames.includes(value as ThemeName);
}
