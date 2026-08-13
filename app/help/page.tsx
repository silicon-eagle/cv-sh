import { PageLayout } from "@/components/page-layout";
import { commandHelp } from "@/lib/commands";
import styles from "./help.module.css";

const shortcuts = [
  ["Enter", "Run the current command"],
  ["Tab", "Autocomplete a command"],
  ["↑ / ↓", "Browse command history"],
  ["Ctrl+L", "Clear command output"],
] as const;

export default function HelpPage() {
  return (
    <PageLayout
      command="help"
      title="Help"
      eyebrow="No terminal knowledge required"
    >
      <div className={styles.columns}>
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

        <section aria-label="Supported commands">
          <h2 className={styles.sectionTitle}>Commands</h2>
          <dl className={styles.commandList}>
            {commandHelp.map(({ usage, description }) => (
              <div key={usage} className={styles.commandRow}>
                <dt className={styles.commandName}>{usage}</dt>
                <dd className={styles.description}>{description}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </PageLayout>
  );
}
