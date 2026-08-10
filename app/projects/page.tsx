import { PageLayout } from "@/components/page-layout";
import styles from "./about.module.css";

export default function ProjectsPage() {
  return (
    <PageLayout command="projects" title="Projects" eyebrow="What did I build?">
      <div className={styles.copy}>
        <p>
          This is a placeholder introduction for Tim. It will become a concise story about his work, approach, and the problems he enjoys solving.
        </p>
        <p>
          For now, the focus is simple: useful software, careful engineering, and clear experiences.
        </p>
      </div>
    </PageLayout>
  );
}
