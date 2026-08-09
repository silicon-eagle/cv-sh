import { PageCommandButtons } from "@/components/page-command-buttons";
import { PageHeading } from "@/components/page-heading";
import styles from "./about.module.css";

export default function ExperiencePage() {
  return (
    <div>
      <PageHeading command="experience" title="Experience" eyebrow="What did I do?" />
      <div className={styles.copy}>
        <p>
          This is a placeholder introduction for Tim. It will become a concise story about his work, approach, and the problems he enjoys solving.
        </p>
        <p>
          For now, the focus is simple: useful software, careful engineering, and clear experiences.
        </p>
      </div>

      <PageCommandButtons />
    </div>
  );
}
