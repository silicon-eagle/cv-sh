"use client";

import { usePathname } from "next/navigation";

import { CommandButton } from "@/components/command-button";
import { useTerminal } from "@/components/terminal-provider";
import { navigationCommands } from "@/lib/commands";
import styles from "./page-command-buttons.module.css";

export function PageCommandButtons() {
  const pathname = usePathname();
  const { navigationVisible } = useTerminal();
  const commands = navigationCommands.filter(
    (command) => command.path !== pathname,
  );

  if (!navigationVisible) return null;

  return (
    <nav aria-label="Page commands" className={styles.commands}>
      {commands.map((command) => {
        const Icon = command.button.icon;

        return (
          <CommandButton
            key={command.name}
            command={command.name}
            label={command.button.label}
            description={command.button.description}
            color={command.button.color}
            icon={<Icon aria-hidden="true" />}
          />
        );
      })}
    </nav>
  );
}
