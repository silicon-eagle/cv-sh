"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "pixelarticons/react/Terminal";

import packageJson from "@/package.json";
import { useTerminal } from "@/components/terminal-provider";
import styles from "./status-bar.module.css";

const pageLabels: Record<string, string> = {
  "/": "HOME",
  "/about": "ABOUT",
  "/education": "EDUCATION",
  "/experience": "EXPERIENCE",
  "/help": "HELP",
  "/projects": "PROJECTS",
  "/skills": "SKILLS",
  "/snake": "SNAKE",
};

export function StatusBar() {
  const pathname = usePathname();
  const { terminalVisible, toggleTerminal } = useTerminal();
  const page = pageLabels[pathname] ?? pathname.replaceAll("/", " ").trim().toUpperCase();

  return (
    <footer className={styles.bar} aria-label="Terminal status">
      <Link className={styles.site} href="/">
        timkelch.dev
      </Link>
      <span className={styles.page}>{page || "HOME"}</span>
      <span className={styles.location}>Tilburg, NL</span>
      <span className={styles.role}>Developer / Philosopher</span>
      <button
        type="button"
        className={styles.terminalToggle}
        aria-label={`${terminalVisible ? "Hide" : "Show"} terminal`}
        aria-pressed={!terminalVisible}
        data-visible={terminalVisible}
        onClick={toggleTerminal}
      >
        <Terminal aria-hidden="true" />
        {terminalVisible ? "HIDE" : "SHOW"}
      </button>
      <span className={styles.version}>v{packageJson.version}</span>
      <span className={styles.status}>
        <span className={styles.dot} aria-hidden="true" />
        ONLINE
      </span>
    </footer>
  );
}
