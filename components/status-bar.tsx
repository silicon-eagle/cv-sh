"use client";

import { usePathname } from "next/navigation";

import styles from "./status-bar.module.css";

const pageLabels: Record<string, string> = {
  "/": "HOME",
  "/about": "ABOUT",
  "/education": "EDUCATION",
  "/experience": "WORK",
  "/help": "HELP",
  "/projects": "PROJECTS",
  "/skills": "SKILLS",
  "/snake": "SNAKE",
};

export function StatusBar() {
  const pathname = usePathname();
  const page = pageLabels[pathname] ?? pathname.replaceAll("/", " ").trim().toUpperCase();

  return (
    <footer className={styles.bar} aria-label="Terminal status">
      <span className={styles.site}>timkelch.dev</span>
      <span className={styles.page}>{page || "HOME"}</span>
      <span className={styles.location}>Tilburg, NL</span>
      <span className={styles.role}>Developer / Philosopher</span>
      <span className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        ONLINE
      </span>
    </footer>
  );
}
