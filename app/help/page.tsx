import { CommandButton } from "@/components/command-button";
import { PageHeading } from "@/components/page-heading";
import styles from "./help.module.css";

const commands = [
  ["home", "Return to the welcome screen"],
  ["about", "Read a short introduction"],
  ["help", "Show commands and keyboard controls"],
  ["theme", "List the available color themes"],
  ["theme <name>", "Apply catppuccin, tokyo-night, or gruvbox"],
  ["clear", "Clear command output"],
] as const;

const shortcuts = [
  ["Enter", "Run the current command"],
  ["Tab", "Autocomplete a command"],
  ["↑ / ↓", "Browse command history"],
  ["Ctrl+L", "Clear command output"],
] as const;

export default function HelpPage() {
  return (
    <div>
      <PageHeading command="help" title="Help" eyebrow="No terminal knowledge required" />

      <div className={styles.columns}>
        <section aria-label="Supported commands">
          <h2 className={styles.sectionTitle}>Commands</h2>
          <dl className={styles.commandList}>
            {commands.map(([command, description]) => (
              <div key={command} className={styles.commandRow}>
                <dt className={styles.commandName}>{command}</dt>
                <dd className={styles.description}>{description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-label="Keyboard controls">
          <h2 className={styles.sectionTitle}>Keyboard</h2>
          <dl className={styles.shortcutList}>
            {shortcuts.map(([key, description]) => (
              <div key={key} className={styles.shortcutRow}>
                <dt className={styles.key}>
                  {key}
                </dt>
                <dd className={styles.description}>{description}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className={styles.home}>
        <CommandButton command="home" label="Home" description="Return to the start" />
      </div>
    </div>
  );
}
