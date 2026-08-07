import { CommandButton } from "@/components/command-button";
import { PageHeading } from "@/components/page-heading";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div>
      <PageHeading command="welcome" title="Welcome." eyebrow="Portfolio terminal" />
      <p className={styles.intro}>
        A software developer focused on thoughtful, reliable digital experiences.
      </p>
      <p className={styles.hint}>
        Choose a command below, or type <span className={styles.accent}>help</span> to begin.
      </p>

      <div className={styles.commands}>
        <CommandButton command="about" label="About" description="A short introduction" color="about" />
        <CommandButton command="help" label="Help" description="Commands and shortcuts" color="help" />
        <CommandButton command="theme" label="Themes" description="Change the terminal palette" color="themes" />
      </div>
    </div>
  );
}
