"use client";

import {
  useEffect,
  useRef,
} from "react";

import { TerminalLine, Prompt } from "@/components/terminal-line";
import { useTerminal } from "@/components/terminal-provider";
import { ThemePicker } from "@/components/theme-picker";
import styles from "./terminal-panel.module.css";

export function TerminalPanel() {
  const { output } = useTerminal();
  const outputRef = useRef<HTMLDivElement>(null);
  const outputLength = output.length;

  useEffect(() => {
    const outputElement = outputRef.current;
    if (outputElement) outputElement.scrollTop = outputElement.scrollHeight;
  }, [outputLength]);

  return (
    <section className={styles.panel} aria-label="Interactive terminal">
      <div ref={outputRef} className={styles.output} aria-live="polite">
        {output.map((entry) => (
          <div key={entry.id} className={styles.outputEntry}>
            <div className={styles.executedLine}>
              <Prompt path="~" />
              <span className={styles.executedCommand}>{entry.command}</span>
            </div>
            {entry.message ? (
              <p className={styles.message}>{entry.message}</p>
            ) : null}
            {entry.kind === "themes" ? <ThemePicker /> : null}
          </div>
        ))}
      </div>

      <TerminalLine />
    </section>
  );
}
