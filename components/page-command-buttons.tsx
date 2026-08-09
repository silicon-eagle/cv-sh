"use client";

import { usePathname } from "next/navigation";

import { CommandButton } from "@/components/command-button";
import {
  navigationCommands,
  type NavigationCommand,
} from "@/lib/commands";
import styles from "./page-command-buttons.module.css";

export function PageCommandButtons() {
  const pathname = usePathname();
  const commands = navigationCommands.filter(
    (command: NavigationCommand) => command.path !== pathname,
  );

  return (
    <nav aria-label="Page commands" className={styles.commands}>
      {commands.map((command: NavigationCommand) => (
        <CommandButton
          key={command.name}
          command={command.name}

          label={command.button.label}
          description={command.button.description}
          color={command.button.color}
        />
      ))}
    </nav>
  );
}
