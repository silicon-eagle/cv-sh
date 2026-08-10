import styles from "./education-card.module.css";

export type Education = {
  period: string;
  qualification: string;
  institution: string;
  description: string;
  subjects: readonly string[];
};

export function EducationCard({ education }: { education: Education }) {
  return (
    <article className={styles.card}>
      <p className={styles.period}>{education.period}</p>
      <span className={styles.marker} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>
          {education.qualification}
          <span className={styles.institution}> @ {education.institution}</span>
        </h2>
        <p className={styles.description}>{education.description}</p>
        <ul className={styles.subjects} aria-label="Subjects">
          {education.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
