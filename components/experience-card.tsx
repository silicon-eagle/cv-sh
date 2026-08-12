import styles from "./experience-card.module.css";

export type Experience = {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: readonly {
    text: string;
    details?: readonly string[];
  }[];
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
        <p className={styles.location}>{experience.location}</p>
        <ul className={styles.highlights}>
          {experience.highlights.map((highlight) => (
            <li key={highlight.text}>
              {highlight.text}
              {highlight.details ? (
                <ul>
                  {highlight.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <ul className={styles.technologies} aria-label="Technologies">
          {experience.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
