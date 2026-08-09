"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import { TerminalLine, Prompt } from "@/components/terminal-line";
import { useTerminal } from "@/components/terminal-provider";
import { ThemePicker } from "@/components/theme-picker";
import styles from "./terminal-shell.module.css";

export function TerminalShell({ children }: { children: ReactNode }) {
  const { output } = useTerminal();
  const outputRef = useRef<HTMLDivElement>(null);
  const outputLength = output.length;

  useEffect(() => {
    const outputElement = outputRef.current;
    if (outputElement) outputElement.scrollTop = outputElement.scrollHeight;
  }, [outputLength]);

  return (
    <main className={styles.viewport}>
      <section
        aria-label="Tim Kelch portfolio terminal"
        className={styles.terminal}
        data-responsive-terminal="true"
      >
        <div className={styles.content}>
          <div className={styles.page}>{children}</div>
          <hr className={styles.divider} />

          <div className={styles.terminalArea}>
            <div ref={outputRef} className={styles.output} aria-live="polite">
              {output.map((entry) => (
                <div key={entry.id} className={styles.outputEntry}>
                  <div className={styles.executedLine}>
                    <Prompt path="~" />
                    <span className={styles.executedCommand}>{entry.command}</span>
                  </div>
                  {entry.message ? (
                    <p className={styles.message}>
                      {entry.message}
                    </p>
                  ) : null}
                  {entry.kind === "themes" ? <ThemePicker /> : null}
                </div>
              ))}
            </div>

            <TerminalLine />
          </div>
        </div>

        <footer className={styles.footer}>
          Copyright Tim Kelch
        </footer>
      </section>
    </main>
  );
}
