import { PageCommandButtons } from "@/components/page-command-buttons";
import { PageHeading } from "@/components/page-heading";
import styles from "./about.module.css";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeading command="projects" title="Projects" eyebrow="What did I build?" />
      <PageCommandButtons />

      <div className={styles.copy}>
        <p>
          This is a placeholder introduction for Tim. It will become a concise story about his work, approach, and the problems he enjoys solving.
        </p>
        <p>
          For now, the focus is simple: useful software, careful engineering, and clear experiences.
        </p>
      </div>
    </div>
  );
}
