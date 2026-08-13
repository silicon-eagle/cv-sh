import { BracketsContent } from "pixelarticons/react/BracketsContent";
import { Briefcase } from "pixelarticons/react/Briefcase";
import { Gamepad } from "pixelarticons/react/Gamepad";
import { Home } from "pixelarticons/react/Home";
import { InfoBox } from "pixelarticons/react/InfoBox";
import { Sparkles } from "pixelarticons/react/Sparkles";
import { University } from "pixelarticons/react/University";
import { User } from "pixelarticons/react/User";
import type { ComponentType, SVGProps } from "react";

import { projects } from "@/lib/projects";

export const themeNames = [
  "catppuccin",
  "catppuccin-light",
  "tokyo-night",
  "gruvbox",
  "nord",
  "ayu",
] as const;

export type ThemeName = (typeof themeNames)[number];

type PixelArtIcon = ComponentType<SVGProps<SVGSVGElement>>;

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
  icon: PixelArtIcon;
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
      action: "cat" | "clear" | "contact" | "cowsay" | "ls" | "nav" | "philosophy" | "theme";
    };

const projectCommands: readonly NavigationCommand[] = projects.map((project) => ({
  name: project.slug,
  autocomplete: [project.slug],
  help: [],
  action: "navigate",
  path: `/projects/${project.slug}`,
  icon: BracketsContent,
  color: "var(--projects-accent)",
}));

export const terminalCommands: readonly TerminalCommand[] = [
  {
    name: "home",
    autocomplete: ["home"],
    help: [{ usage: "home", description: "Return to the welcome screen" }],
    action: "navigate",
    path: "/",
    icon: Home,
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
    icon: User,
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
    icon: Briefcase,
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
    icon: University,
    color: "var(--education-accent)",
    button: {
      label: "Education",
      description: "What did I study?",
    },
  },
  {
    name: "skills",
    autocomplete: ["skills"],
    help: [{ usage: "skills", description: "Explore skills and interests" }],
    action: "navigate",
    path: "/skills",
    icon: Sparkles,
    color: "var(--skills-accent)",
    button: {
      label: "Skills",
      description: "Strengths and interests",
    },
  },
  {
    name: "projects",
    autocomplete: ["projects"],
    help: [
      { usage: "projects", description: "Find out about the things I make" },
      {
        usage: "projects/<project>",
        description: "Open a specific project from the projects page",
      },
    ],
    action: "navigate",
    path: "/projects",
    icon: BracketsContent,
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
    icon: Gamepad,
    color: "var(--snake-accent)",
  },
  {
    name: "help",
    autocomplete: ["help"],
    help: [{ usage: "help", description: "Show commands and keyboard controls" }],
    action: "navigate",
    path: "/help",
    icon: InfoBox,
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
    name: "contact",
    autocomplete: ["contact"],
    help: [{ usage: "contact", description: "Show my email address" }],
    action: "contact",
  },
  {
    name: "cat",
    autocomplete: ["cat"],
    help: [{ usage: "cat", description: "Show my cat avatar" }],
    action: "cat",
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
    name: "ls",
    autocomplete: ["ls"],
    help: [{ usage: "ls", description: "List all available commands" }],
    action: "ls",
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

export function findProjectCommand(name: string) {
  return projectCommands.find((command) => command.name === name);
}

export function autocompleteCommands(pathname: string): readonly string[] {
  if (pathname !== "/projects") return supportedCommands;
  return [
    ...supportedCommands,
    ...projectCommands.flatMap((command) => command.autocomplete),
  ];
}

export function findNavigationCommand(name: string) {
  return navigationCommands.find((command) => command.name === name);
}

export function isThemeName(value: string | undefined): value is ThemeName {
  return themeNames.includes(value as ThemeName);
}
