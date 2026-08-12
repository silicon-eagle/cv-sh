import { PageLayout } from "@/components/page-layout";
import styles from "./skills.module.css";

const sections = [
  {
    title: "Strengths",
    items: [
      "Analytical",
      "Innovative",
      "Curious",
      "Problem solver",
      "Punctual",
      "Team player",
      "Interdisciplinary",
      "Socially engaged",
    ],
  },
  {
    title: "Skills",
    items: [
      "Python",
      "TypeScript",
      "C#",
      "Java",
      "C++",
      "Rust",
      "R",
      "SQL",
      "Git",
      "Azure",
      "PowerShell",
      "Docker",
      "Kubernetes",
      "Linux",
      "LaTeX",
    ],
  },
  {
    title: "Interests",
    items: [
      "AI",
      "Software Engineering",
      "Data Science",
      "Data Engineering",
      "Operations Research",
      "Process Optimization",
      "Philosophy",
      "Politics",
    ],
  },
  {
    title: "Hobbies",
    items: [
      "Reading",
      "Guitar",
      "Drums",
      "Concerts & festivals",
      "Board games",
      "Running",
      "Cooking",
      "Gaming",
      "Sewing",
    ],
  },
] as const;

const languages = [
  { name: "Dutch", level: 5 },
  { name: "English", level: 5 },
  { name: "German", level: 4 },
  { name: "French", level: 2 },
] as const;

export default function SkillsPage() {
  return (
    <PageLayout command="skills" title="Skills" eyebrow="What do I bring?">
      <div className={styles.grid}>
        {sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.heading}>
              <span aria-hidden="true">./</span>
              {section.title.toLowerCase()}
            </h2>
            <ul className={styles.tags}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className={`${styles.section} ${styles.languages}`}>
          <h2 className={styles.heading}>
            <span aria-hidden="true">./</span>
            languages
          </h2>
          <dl className={styles.languageList}>
            {languages.map((language) => (
              <div key={language.name} className={styles.language}>
                <dt>{language.name}</dt>
                <dd
                  className={styles.level}
                  aria-label={`${language.level} out of 5`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={index < language.level ? styles.active : undefined}
                      aria-hidden="true"
                    />
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </PageLayout>
  );
}
