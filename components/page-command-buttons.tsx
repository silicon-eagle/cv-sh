"use client";

import { usePathname } from "next/navigation";
import { Close } from "pixelarticons/react/Close";
import { Menu } from "pixelarticons/react/Menu";
import { useState } from "react";

import { CommandButton } from "@/components/command-button";
import { useTerminal } from "@/components/terminal-provider";
import {
  navigationButtonCommands,
  type NavigationButtonCommand,
} from "@/lib/commands";
import styles from "./page-command-buttons.module.css";

type CommandNavigationProps = {
  commands: readonly NavigationButtonCommand[];
};

function CommandNavigation({ commands }: CommandNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav aria-label="Page commands" className={styles.commands}>
      <button
        type="button"
        className={styles.menuToggle}
        aria-controls="page-command-list"
        aria-expanded={menuOpen}
        aria-label={`${menuOpen ? "Close" : "Open"} page navigation`}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <Close aria-hidden="true" /> : <Menu aria-hidden="true" />}
        <span>MENU</span>
      </button>
      <div
        id="page-command-list"
        className={styles.commandList}
        data-open={menuOpen}
        onClickCapture={() => setMenuOpen(false)}
      >
        {commands.map((command) => {
          const Icon = command.icon;

          return (
            <CommandButton
              key={command.name}
              command={command.name}
              label={command.button.label}
              description={command.button.description}
              color={command.color}
              icon={<Icon aria-hidden="true" />}
            />
          );
        })}
      </div>
    </nav>
  );
}

export function PageCommandButtons() {
  const pathname = usePathname();
  const { navigationVisible } = useTerminal();
  const commands = navigationButtonCommands.filter(
    (command) => command.path !== pathname,
  );

  if (!navigationVisible) return null;

  return <CommandNavigation key={pathname} commands={commands} />;
}
