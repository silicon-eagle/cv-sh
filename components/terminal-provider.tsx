"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  commandHelp,
  findTerminalCommand,
  isThemeName,
  themeNames,
} from "@/lib/commands";
import { cowsay } from "@/lib/cowsay";
import {
  fallbackQuote,
  isPhilosopherQuote,
  type PhilosopherQuote,
} from "@/lib/quote";
import { parseCommand } from "@/lib/terminal";
import { useTheme } from "@/components/theme-provider";

export type TerminalOutput = {
  id: number;
  command: string;
  message?: string;
  kind?: "cow" | "quote" | "themes";
  quote?: PhilosopherQuote;
  cow?: string;
};

type TerminalContextValue = {
  execute: (input: string) => void;
  clear: () => void;
  history: readonly string[];
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

export function TerminalProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [history, setHistory] = useState<string[]>([]);
  const [navigationVisible, setNavigationVisible] = useState(false);
  const [output, setOutput] = useState<TerminalOutput[]>([]);
  const navigationVisibleRef = useRef(false);
  const outputId = useRef(0);

  const appendOutput = useCallback((entry: Omit<TerminalOutput, "id">) => {
    outputId.current += 1;
    setOutput((current) => [...current, { ...entry, id: outputId.current }]);
  }, []);

  const clear = useCallback(() => setOutput([]), []);

  const execute = useCallback((input: string) => {
    const command = parseCommand(input);
    if (!command.normalized) return;

    setHistory((current) => [...current, command.normalized]);

    const definition = findTerminalCommand(command.name);

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
          const response = await fetch("/api/philosophy", {
            cache: "no-store",
          });
          if (!response.ok) {
            throw new Error(`Quote endpoint returned ${response.status}`);
          }

          const result: unknown = await response.json();
          if (!isPhilosopherQuote(result)) {
            throw new Error("Quote endpoint returned an invalid response");
          }
          quote = result;
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
  }, [appendOutput, clear, router, setTheme]);

  const value = useMemo(
    () => ({ execute, clear, history, navigationVisible, output }),
    [clear, execute, history, navigationVisible, output],
  );

  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminal(): TerminalContextValue {
  const context = useContext(TerminalContext);
  if (!context) throw new Error("useTerminal must be used inside TerminalProvider");
  return context;
}
