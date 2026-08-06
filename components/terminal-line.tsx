"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { useTerminal } from "@/components/terminal-provider";
import { autocompleteCommand, promptPath } from "@/lib/terminal";
import styles from "./terminal-line.module.css";

export function Prompt({ path }: { path: string }) {
  return (
    <span
      className={styles.prompt}
      aria-hidden="true"
      data-testid="terminal-prompt"
    >
      <span className={styles.user}>tim@kelch</span>
      <span className={styles.separator}>:</span>
      <span className={styles.path}>{path}</span>
      <span className={styles.symbol}>$</span>
    </span>
  );
}

export function TerminalLine() {
  const pathname = usePathname();
  const { clear, execute, history } = useTerminal();
  const [value, setValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(history.length);

  return (
    <div className={styles.line}>
      <Prompt path={promptPath(pathname)} />
      <div className={styles.inputWrap}>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setHistoryIndex(history.length);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              execute(value);
              setValue("");
              setHistoryIndex(history.length + (value.trim() ? 1 : 0));
            } else if (event.key === "Tab") {
              event.preventDefault();
              setValue(autocompleteCommand(value));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (history.length === 0) return;
              const nextIndex = Math.max(0, Math.min(historyIndex - 1, history.length - 1));
              setHistoryIndex(nextIndex);
              setValue(history[nextIndex]);
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              const nextIndex = Math.min(history.length, historyIndex + 1);
              setHistoryIndex(nextIndex);
              setValue(nextIndex === history.length ? "" : history[nextIndex]);
            } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
              event.preventDefault();
              clear();
            }
          }}
          aria-label="Terminal command"
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          className={styles.input}
        />
        <span
          data-testid="terminal-cursor"
          className={`terminal-cursor ${styles.cursor}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
