import type { ReactNode } from "react";

import { StatusBar } from "@/components/status-bar";
import styles from "./terminal-shell.module.css";

export function TerminalShell({ children }: { children: ReactNode }) {
  return (
    <main className={styles.viewport}>
      <section
        aria-label="Tim Kelch portfolio terminal"
        className={styles.terminal}
        data-responsive-terminal="true"
      >
        <div className={styles.content}>{children}</div>

        <StatusBar />
      </section>
    </main>
  );
}
