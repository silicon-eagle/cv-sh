"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { getPhilosopherQuote } from "@/app/actions";
import {
  commandHelp,
  findProjectCommand,
  findTerminalCommand,
  isThemeName,
  themeNames,
} from "@/lib/commands";
import type { CatImage } from "@/lib/cats";
import { cowsay } from "@/lib/cowsay";
import {
  fallbackQuote,
  type PhilosopherQuote,
} from "@/lib/quote";
import { parseCommand } from "@/lib/terminal";
import { useTheme } from "@/components/theme-provider";

export type TerminalOutput = {
  id: number;
  command: string;
  message?: string;
  kind?: "contact" | "cow" | "quote" | "themes";
  email?: string;
  quote?: PhilosopherQuote;
  cow?: string;
};

type DisplayedCatImage = CatImage & {
  displayId: number;
};

type TerminalContextValue = {
  execute: (input: string) => void;
  clear: () => void;
  history: readonly string[];
  catImage: DisplayedCatImage | null;
  navigationVisible: boolean;
  output: readonly TerminalOutput[];
};

const TerminalContext = createContext<TerminalContextValue | null>(null);

function commandListing(): string {
  const usageWidth = Math.max(...commandHelp.map((entry) => entry.usage.length));
  return commandHelp
    .map(
      (entry) =>
        `${entry.usage.padEnd(usageWidth)}  ${entry.description}`,
    )
    .join("\n");
}

type TerminalProviderProps = {
  children: ReactNode;
  catImages?: readonly CatImage[];
};

export function TerminalProvider({
  children,
  catImages = [],
}: TerminalProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [history, setHistory] = useState<string[]>([]);
  const [catImage, setCatImage] = useState<DisplayedCatImage | null>(null);
  const [navigationVisible, setNavigationVisible] = useState(false);
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const navigationVisibleRef = useRef(false);
  const catTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const catDisplayIdRef = useRef(0);
  const outputId = useRef(0);

  useEffect(
    () => () => {
      if (catTimeoutRef.current) clearTimeout(catTimeoutRef.current);
    },
    [],
  );

  const appendOutput = useCallback((entry: Omit<TerminalOutput, "id">) => {
    outputId.current += 1;
    setOutput((current) => [...current, { ...entry, id: outputId.current }]);
  }, []);

  const clear = useCallback(() => setOutput([]), []);

  const execute = useCallback((input: string) => {
    const command = parseCommand(input);
    if (!command.normalized) return;

    setHistory((current) => [...current, command.normalized]);

    const definition =
      findTerminalCommand(command.name) ??
      (pathname === "/projects" ? findProjectCommand(command.name) : undefined);

    if (definition?.action === "navigate" && !command.argument) {
      router.push(definition.path);
      return;
    }

    if (definition?.action === "clear" && !command.argument) {
      clear();
      return;
    }

    if (definition?.action === "nav" && !command.argument) {
      const nextVisible = !navigationVisibleRef.current;
      navigationVisibleRef.current = nextVisible;
      setNavigationVisible(nextVisible);
      appendOutput({
        command: command.normalized,
        message: `Navigation ${nextVisible ? "shown" : "hidden"}.`,
      });
      return;
    }

    if (definition?.action === "theme") {
      if (!command.argument) {
        appendOutput({ command: command.normalized, kind: "themes" });
        return;
      }
      if (isThemeName(command.argument)) {
        setTheme(command.argument);
        appendOutput({
          command: command.normalized,
          message: `Theme set to ${command.argument}.`,
        });
        return;
      }
      appendOutput({
        command: command.normalized,
        message: `Unknown theme "${command.argument}". Choose: ${themeNames.join(", ")}.`,
      });
      return;
    }

    if (definition?.action === "philosophy" && !command.argument) {
      void (async () => {
        let quote = fallbackQuote;

        try {
          quote = await getPhilosopherQuote();
        } catch (error) {
          console.error("Unable to load a philosopher quote", error);
        }

        appendOutput({
          command: command.normalized,
          kind: "quote",
          quote,
        });
      })();
      return;
    }

    if (definition?.action === "contact" && !command.argument) {
      appendOutput({
        command: command.normalized,
        kind: "contact",
        email: "tim.kelch@pm.me",
      });
      return;
    }

    if (definition?.action === "cat" && !command.argument) {
      const image = catImages[Math.floor(Math.random() * catImages.length)];
      if (!image) {
        appendOutput({
          command: command.normalized,
          message: "cat: no images found",
        });
        return;
      }

      if (catTimeoutRef.current) clearTimeout(catTimeoutRef.current);
      catDisplayIdRef.current += 1;
      setCatImage({ ...image, displayId: catDisplayIdRef.current });
      catTimeoutRef.current = setTimeout(() => {
        setCatImage(null);
        catTimeoutRef.current = null;
      }, 4000);
      return;
    }

    if (definition?.action === "cowsay") {
      appendOutput({
        command: command.rawArgument
          ? `cowsay ${command.rawArgument}`
          : "cowsay",
        kind: "cow",
        cow: cowsay(command.rawArgument),
      });
      return;
    }

    if (definition?.action === "ls" && !command.argument) {
      appendOutput({
        command: command.normalized,
        message: commandListing(),
      });
      return;
    }

    appendOutput({
      command: command.normalized,
      message: `${command.normalized}: command not found`,
    });
  }, [appendOutput, catImages, clear, pathname, router, setTheme]);

  const value = useMemo(
    () => ({ execute, clear, history, catImage, navigationVisible, output }),
    [catImage, clear, execute, history, navigationVisible, output],
  );

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminal(): TerminalContextValue {
  const context = useContext(TerminalContext);
  if (!context) throw new Error("useTerminal must be used inside TerminalProvider");
  return context;
}
