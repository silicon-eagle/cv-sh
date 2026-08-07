export const themeNames = ["catppuccin", "tokyo-night", "gruvbox"] as const;

export type ThemeName = (typeof themeNames)[number];

type CommandHelp = {
  usage: string;
  description: string;
};

export type NavigationCommand = {
  name: string;
  autocomplete: readonly string[];
  help: readonly CommandHelp[];
  action: "navigate";
  path: string;
  button: {
    label: string;
    description: string;
    color?: "about" | "help" | "themes";
  };
};

type TerminalCommand =
  | NavigationCommand
  | {
      name: string;
      autocomplete: readonly string[];
      help: readonly CommandHelp[];
      action: "clear" | "theme";
    };

export const terminalCommands: readonly TerminalCommand[] = [
  {
    name: "home",
    autocomplete: ["home"],
    help: [{ usage: "home", description: "Return to the welcome screen" }],
    action: "navigate",
    path: "/",
    button: {
      label: "Home",
      description: "Return to the start",
    },
  },
  {
    name: "about",
    autocomplete: ["about"],
    help: [{ usage: "about", description: "Read a short introduction" }],
    action: "navigate",
    path: "/about",
    button: {
      label: "About",
      description: "A short introduction",
      color: "about",
    },
  },
  {
    name: "help",
    autocomplete: ["help"],
    help: [{ usage: "help", description: "Show commands and keyboard controls" }],
    action: "navigate",
    path: "/help",
    button: {
      label: "Help",
      description: "Commands and shortcuts",
      color: "help",
    },
  },
  {
    name: "theme",
    autocomplete: ["theme", ...themeNames.map((theme) => `theme ${theme}`)],
    help: [
      { usage: "theme", description: "List the available color themes" },
      {
        usage: "theme <name>",
        description: `Apply ${themeNames.join(", ").replace(/, ([^,]+)$/, ", or $1")}`,
      },
    ],
    action: "theme",
  },
  {
    name: "clear",
    autocomplete: ["clear"],
    help: [{ usage: "clear", description: "Clear command output" }],
    action: "clear",
  },
];

export const supportedCommands = terminalCommands.flatMap(
  (command) => command.autocomplete,
);

export const commandHelp = terminalCommands.flatMap((command) => command.help);

export const navigationCommands: readonly NavigationCommand[] = terminalCommands.filter(
  (command): command is NavigationCommand => command.action === "navigate",
);

export function findTerminalCommand(name: string) {
  return terminalCommands.find((command) => command.name === name);
}

export function isThemeName(value: string | undefined): value is ThemeName {
  return themeNames.includes(value as ThemeName);
}
