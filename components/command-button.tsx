"use client";

import type { CSSProperties, ReactNode } from "react";

import { useTerminal } from "@/components/terminal-provider";
import styles from "./command-button.module.css";

type CommandButtonProps = {
  command: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  compact?: boolean;
  color?: string;
};

type CommandButtonStyle = CSSProperties & {
  "--command-color"?: string;
};

export function CommandButton({
  command,
  label,
  description,
  icon,
  compact = false,
  color,
}: CommandButtonProps) {
  const { execute } = useTerminal();
  const style: CommandButtonStyle | undefined = color
    ? { "--command-color": color }
    : undefined;

  return (
    <button
      type="button"
      onClick={() => execute(command)}
      aria-label={[label, description].filter(Boolean).join(" ")}
      className={compact ? styles.compact : styles.button}
      style={style}
    >
      <span className={styles.command}>
        {icon ?? <span>$ {command}</span>}
      </span>
      <span>
        <span className={styles.label}>{label}</span>
        {/* {description ? ( */}
        {/*   <span className={styles.description}> */}
        {/*     {description} */}
        {/*   </span> */}
        {/* ) : null} */}
      </span>
    </button>
  );
}
