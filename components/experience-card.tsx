import styles from "./experience-card.module.css";

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: readonly string[];
};

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className={styles.card}>
      <p className={styles.period}>{experience.period}</p>
      <span className={styles.marker} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>
          {experience.role}
          <span className={styles.company}> @ {experience.company}</span>
        </h2>
        <p className={styles.description}>{experience.description}</p>
        <ul className={styles.technologies} aria-label="Technologies">
          {experience.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
