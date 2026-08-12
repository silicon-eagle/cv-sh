"use client";

import type { CSSProperties } from "react";

import { useTerminal } from "@/components/terminal-provider";
import styles from "@/app/home.module.css";

const bootLines = [
  ["Initializing timkelch.dev...", ""],
  ["Loading profile.............", "OK"],
  ["Mounting projects...........", "OK"],
  ["Starting terminal...........", "OK"],
] as const;

const shortcuts = [
  ["ABOUT", "about"],
  ["WORK", "experience"],
  ["PROJECTS", "projects"],
  ["CONTACT", "contact"],
] as const;

export function HomeTerminal() {
  const { execute } = useTerminal();

  return (
    <div className={styles.root}>
      <div className={styles.boot} aria-hidden="true">
        {bootLines.map(([label, status], index) => (
          <p
            key={label}
            className={styles.bootLine}
            style={{ "--boot-index": index } as CSSProperties}
          >
            <span>{label}</span>
            {status ? <span className={styles.ok}>{status}</span> : null}
          </p>
        ))}
        <p className={styles.bootWelcome}>Welcome.</p>
      </div>

      <section className={styles.home} aria-label="Welcome to timkelch.dev">
        <p className={styles.hostname}>timkelch.dev</p>
        <div className={styles.rule} aria-hidden="true" />

        <h1>Hello, I&apos;m Tim.</h1>

        <div className={styles.identity}>
          <p>Developer by profession.</p>
          <p>Mathematician by training.</p>
          <p>Philosopher by nature.</p>
          <p>Tinkerer by choice.</p>
        </div>

        <p className={styles.intro}>
          I like building useful software, understanding how systems work,
          <br className={styles.desktopBreak} />
          and asking whether they should work that way in the first place.
        </p>

        <nav className={styles.shortcuts} aria-label="Homepage shortcuts">
          {shortcuts.map(([label, command]) => (
            <button
              key={command}
              type="button"
              onClick={() => execute(command)}
            >
              [ {label} ]
            </button>
          ))}
        </nav>

        <p className={styles.hint}>
          Type{" "}
          <button type="button" onClick={() => execute("help")}>
            [help]
          </button>{" "}
          for more information, or type{" "}
          <button type="button" onClick={() => execute("ls")}>
            [ls]
          </button>{" "}
          to view all available commands.
        </p>
      </section>
    </div>
  );
}
