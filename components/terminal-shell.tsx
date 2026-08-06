"use client";

import type { ReactNode } from "react";

import { TerminalLine, Prompt } from "@/components/terminal-line";
import { useTerminal } from "@/components/terminal-provider";
import { ThemePicker } from "@/components/theme-picker";
import styles from "./terminal-shell.module.css";

export function TerminalShell({ children }: { children: ReactNode }) {
  const { output } = useTerminal();

  return (
    <main className={styles.viewport}>
      <section
        aria-label="Tim Kelch portfolio terminal"
        className={styles.terminal}
        data-responsive-terminal="true"
      >
        <div className={styles.content}>
          <div className={styles.page}>{children}</div>

          {output.length ? (
            <div className={styles.output} aria-live="polite">
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
          ) : null}

          <TerminalLine />
        </div>

        <footer className={styles.footer}>
          Copyright Tim Kelch
        </footer>
      </section>
    </main>
  );
}
