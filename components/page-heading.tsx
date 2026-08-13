import { findNavigationCommand } from "@/lib/commands";
import styles from "./page-heading.module.css";

type PageHeadingProps = {
  command: string;
  title: string;
  eyebrow?: string;
};

export function PageHeading({ command, title }: PageHeadingProps) {
  const navigationCommand = findNavigationCommand(command.split("/")[0]);
  const Icon = navigationCommand?.icon;

  return (
    <header className={styles.header}>
      <p className={styles.prompt}>
        <span className={styles.user}>tim@kelch</span>
        <span>:~$ </span>
        <span className={styles.command}>{command}</span>
      </p>
      {Icon ? (
        <Icon
          aria-hidden="true"
          className={styles.icon}
          style={{ color: navigationCommand.color }}
        />
      ) : null}
      <h1 className={styles.srOnly}>{title}</h1>
    </header>
  );
}
