import type { ReactNode } from "react";

import { HideableTerminal } from "@/components/hideable-terminal";
import { PageCommandButtons } from "@/components/page-command-buttons";
import { PageHeading } from "@/components/page-heading";
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
      <div className={styles.header}>
        <PageHeading command={command} title={title} eyebrow={eyebrow} />
        <PageCommandButtons />
      </div>
      <div className={styles.page}>
        <div className={styles.content}>{children}</div>
      </div>
      <HideableTerminal className={styles.terminal} />
    </div>
  );
}
