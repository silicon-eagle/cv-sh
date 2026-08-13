"use client";

import { CommandButton } from "@/components/command-button";
import { themeNames, type ThemeName } from "@/lib/commands";
import styles from "./theme-picker.module.css";

const labels: Record<ThemeName, string> = {
  catppuccin: "Catppuccin Dark",
  "catppuccin-light": "Catppuccin Light",
  "tokyo-night": "Tokyo Night",
  gruvbox: "Gruvbox",
  nord: "Nord",
  ayu: "Ayu",
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
