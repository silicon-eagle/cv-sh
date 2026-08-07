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
  const [cursorIndex, setCursorIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(history.length);

  return (
    <div className={styles.line}>
      <Prompt path={promptPath(pathname)} />
      <div className={styles.inputWrap}>
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setCursorIndex(event.target.selectionStart ?? event.target.value.length);
            setHistoryIndex(history.length);
          }}
          onSelect={(event) => {
            setCursorIndex(event.currentTarget.selectionStart ?? value.length);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              execute(value);
              setValue("");
              setCursorIndex(0);
              setHistoryIndex(history.length + (value.trim() ? 1 : 0));
            } else if (event.key === "Tab") {
              event.preventDefault();
              const completedValue = autocompleteCommand(value);
              setValue(completedValue);
              setCursorIndex(completedValue.length);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (history.length === 0) return;
              const nextIndex = Math.max(0, Math.min(historyIndex - 1, history.length - 1));
              setHistoryIndex(nextIndex);
              setValue(history[nextIndex]);
              setCursorIndex(history[nextIndex].length);
            } else if (event.key === "ArrowDown") {
              event.preventDefault();
              const nextIndex = Math.min(history.length, historyIndex + 1);
              const nextValue = nextIndex === history.length ? "" : history[nextIndex];
              setHistoryIndex(nextIndex);
              setValue(nextValue);
              setCursorIndex(nextValue.length);
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
        <span className={styles.cursorLayer} aria-hidden="true">
          <span data-testid="terminal-cursor-text" className={styles.cursorText}>
            {value.slice(0, cursorIndex)}
          </span>
          <span
            data-testid="terminal-cursor"
            data-blinking={isFocused}
            className={`terminal-cursor ${styles.cursor}`}
          />
        </span>
      </div>
    </div>
  );
}
