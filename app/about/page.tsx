import { CommandButton } from "@/components/command-button";
import { PageHeading } from "@/components/page-heading";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div>
      <PageHeading command="about" title="About" eyebrow="A little context" />
      <div className={styles.copy}>
        <p>
          This is a placeholder introduction for Tim. It will become a concise story about his work, approach, and the problems he enjoys solving.
        </p>
        <p>
          For now, the focus is simple: useful software, careful engineering, and clear experiences.
        </p>
      </div>

      <div className={styles.commands}>
        <CommandButton command="home" label="Home" description="Return to the start" />
        <CommandButton command="help" label="Help" description="View all commands" />
      </div>
    </div>
  );
}
