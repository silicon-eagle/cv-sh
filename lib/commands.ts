import {
  BriefcaseBusiness,
  CircleHelp,
  FolderCode,
  House,
  UserRound,
  type LucideIcon,
} from "lucide-react";

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
    color: string;
    icon: LucideIcon;
  };
};

type TerminalCommand =
  | NavigationCommand
  | {
      name: string;
      autocomplete: readonly string[];
      help: readonly CommandHelp[];
      action: "clear" | "nav" | "theme";
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
      color: "var(--home-accent)",
      icon: House,
    },
  },
  {
    name: "about",
    autocomplete: ["about"],
    help: [{ usage: "about", description: "Find out about who am I" }],
    action: "navigate",
    path: "/about",
    button: {
      label: "About",
      description: "A short introduction",
      color: "var(--about-accent)",
      icon: UserRound,
    },
  },
  {
    name: "experience",
    autocomplete: ["experience"],
    help: [{ usage: "experience", description: "Find out about the things I do" }],
    action: "navigate",
    path: "/experience",
    button: {
      label: "Experience",
      description: "What did I do?",
      color: "var(--experience-accent)",
      icon: BriefcaseBusiness,
    },
  },
  {
    name: "projects",
    autocomplete: ["projects"],
    help: [{ usage: "projects", description: "Find out about the things I make" }],
    action: "navigate",
    path: "/projects",
    button: {
      label: "Projects",
      description: "What did I build?",
      color: "var(--projects-accent)",
      icon: FolderCode,
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
      color: "var(--help-accent)",
      icon: CircleHelp,
    },
  },
  {
    name: "nav",
    autocomplete: ["nav"],
    help: [{ usage: "nav", description: "Show or hide page navigation" }],
    action: "nav",
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

export function findNavigationCommand(name: string) {
  return navigationCommands.find((command) => command.name === name);
}

export function isThemeName(value: string | undefined): value is ThemeName {
  return themeNames.includes(value as ThemeName);
}
