import { findNavigationCommand } from "@/lib/commands";
import styles from "./page-heading.module.css";

type PageHeadingProps = {
  command: string;
  title: string;
  eyebrow?: string;
};

export function PageHeading({ command, title, eyebrow }: PageHeadingProps) {
  const navigationCommand = findNavigationCommand(command);
  const Icon = navigationCommand?.button.icon;

  return (
    <header>
      <p className={styles.prompt}>
        <span className={styles.user}>tim@kelch</span>
        <span>:~$ </span>
        <span className={styles.command}>{command}</span>
      </p>
      {Icon ? (
        <Icon
          aria-hidden="true"
          className={styles.icon}
          style={{ color: navigationCommand.button.color }}
        />
      ) : null}
      {eyebrow ? (
        <p className={styles.eyebrow}>
          {eyebrow}
        </p>
      ) : null}
      <h1 className={styles.title}>
        {title}
      </h1>
    </header>
  );
}
