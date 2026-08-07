import { PageCommandButtons } from "@/components/page-command-buttons";
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

      <PageCommandButtons />
    </div>
  );
}
