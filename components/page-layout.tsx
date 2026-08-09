import type { ReactNode } from "react";

import { PageCommandButtons } from "@/components/page-command-buttons";
import { PageHeading } from "@/components/page-heading";
import { TerminalPanel } from "@/components/terminal-panel";
import styles from "./page-layout.module.css";

type PageLayoutProps = {
  command: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
};

export function PageLayout({
  command,
  title,
  eyebrow,
  children,
}: PageLayoutProps) {
  return (
    <div className={styles.layout}>
      <PageHeading command={command} title={title} eyebrow={eyebrow} />
      <PageCommandButtons />
      <div className={styles.content}>{children}</div>
      <div className={styles.terminal}>
        <TerminalPanel />
      </div>
    </div>
  );
}
