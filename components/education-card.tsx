import styles from "./education-card.module.css";

export type Education = {
  period: string;
  qualification: string;
  institution: string;
  location: string;
  highlights: readonly string[];
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
        <p className={styles.location}>{education.location}</p>
        <ul className={styles.highlights}>
          {education.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <ul className={styles.subjects} aria-label="Subjects">
          {education.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
