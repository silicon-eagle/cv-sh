import {
  BriefcaseBusiness,
  CircleHelp,
  FolderCode,
  Gamepad2,
  GraduationCap,
  House,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export const themeNames = [
  "catppuccin",
  "catppuccin-light",
  "tokyo-night",
  "gruvbox",
  "nord",
  "ayu",
] as const;

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
  icon: LucideIcon;
  color: string;
  button?: {
    label: string;
    description: string;
  };
};

export type NavigationButtonCommand = NavigationCommand & {
  button: NonNullable<NavigationCommand["button"]>;
};

type TerminalCommand =
  | NavigationCommand
  | {
      name: string;
      autocomplete: readonly string[];
      help: readonly CommandHelp[];
      action: "clear" | "cowsay" | "nav" | "philosophy" | "theme";
    };

export const terminalCommands: readonly TerminalCommand[] = [
  {
    name: "home",
    autocomplete: ["home"],
    help: [{ usage: "home", description: "Return to the welcome screen" }],
    action: "navigate",
    path: "/",
    icon: House,
    color: "var(--home-accent)",
    button: {
      label: "Home",
      description: "Return to the start",
    },
  },
  {
    name: "about",
    autocomplete: ["about"],
    help: [{ usage: "about", description: "Find out about who am I" }],
    action: "navigate",
    path: "/about",
    icon: UserRound,
    color: "var(--about-accent)",
    button: {
      label: "About",
      description: "A short introduction",
    },
  },
  {
    name: "experience",
    autocomplete: ["experience"],
    help: [{ usage: "experience", description: "Find out about the things I do" }],
    action: "navigate",
    path: "/experience",
    icon: BriefcaseBusiness,
    color: "var(--experience-accent)",
    button: {
      label: "Experience",
      description: "What did I do?",
    },
  },
  {
    name: "education",
    autocomplete: ["education"],
    help: [{ usage: "education", description: "Find out about what I studied" }],
    action: "navigate",
    path: "/education",
    icon: GraduationCap,
    color: "var(--education-accent)",
    button: {
      label: "Education",
      description: "What did I study?",
    },
  },
  {
    name: "projects",
    autocomplete: ["projects"],
    help: [{ usage: "projects", description: "Find out about the things I make" }],
    action: "navigate",
    path: "/projects",
    icon: FolderCode,
    color: "var(--projects-accent)",
    button: {
      label: "Projects",
      description: "What did I build?",
    },
  },
  {
    name: "snake",
    autocomplete: ["snake"],
    help: [{ usage: "snake", description: "Play a little game" }],
    action: "navigate",
    path: "/snake",
    icon: Gamepad2,
    color: "var(--snake-accent)",
  },
  {
    name: "help",
    autocomplete: ["help"],
    help: [{ usage: "help", description: "Show commands and keyboard controls" }],
    action: "navigate",
    path: "/help",
    icon: CircleHelp,
    color: "var(--help-accent)",
    button: {
      label: "Help",
      description: "Commands and shortcuts",
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
    name: "cowsay",
    autocomplete: ["cowsay"],
    help: [{ usage: "cowsay [message]", description: "Let a custom cow speak" }],
    action: "cowsay",
  },
  {
    name: "philosophy",
    autocomplete: ["philosophy"],
    help: [{ usage: "philosophy", description: "Print a random philosopher quote" }],
    action: "philosophy",
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

export const navigationButtonCommands: readonly NavigationButtonCommand[] =
  navigationCommands.filter(
    (command): command is NavigationButtonCommand => Boolean(command.button),
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
