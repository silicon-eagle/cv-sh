import {
  ExperienceCard,
  type Experience,
} from "@/components/experience-card";
import styles from "./experience-timeline.module.css";

const experiences: readonly Experience[] = [
  {
    period: "2023 - Present",
    role: "Lead Python Developer",
    company: "Stedin",
    description:
      "Leading a team of developers building the next generation energy management platform.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "Leadership"],
  },
  {
    period: "2021 - 2023",
    role: "Python Developer",
    company: "Stedin",
    description:
      "Developed and maintained backend services used across the organization.",
    technologies: ["Python", "Django", "PostgreSQL", "Kubernetes"],
  },
  {
    period: "2019 - 2021",
    role: "Data Engineer",
    company: "Various",
    description: "Worked on data pipelines and analytics solutions.",
    technologies: ["Python", "SQL", "Airflow", "Databricks"],
  },
  {
    period: "2018 - 2019",
    role: "Software Engineer",
    company: "Various",
    description: "Full-stack development and system integrations.",
    technologies: ["JavaScript", "React", "Node.js", "Linux"],
  },
];

export function ExperienceTimeline() {
  return (
    <section className={styles.timeline} aria-label="Work experience timeline">
      {experiences.map((experience) => (
        <ExperienceCard
          key={`${experience.period}-${experience.role}`}
          experience={experience}
        />
      ))}
    </section>
  );
}
