"use client";

import { CommandButton } from "@/components/command-button";
import { themeNames } from "@/lib/commands";
import styles from "./theme-picker.module.css";

const labels = {
  catppuccin: "Catppuccin",
  "tokyo-night": "Tokyo Night",
  gruvbox: "Gruvbox",
};

export function ThemePicker() {
  return (
    <div className={styles.picker} aria-label="Available themes">
      {themeNames.map((theme) => (
        <CommandButton
          key={theme}
          command={`theme ${theme}`}
          label={labels[theme]}
          compact
        />
      ))}
    </div>
  );
}
