import {
  ExperienceCard,
  type Experience,
} from "@/components/experience-card";
import styles from "./experience-timeline.module.css";

const experiences: readonly Experience[] = [
  {
    period: "May 2025 - Present",
    role: "Digital Innovation Developer",
    company: "Stedin",
    location: "Rotterdam",
    highlights: [
      {
        text:
          "In Stedin's digital innovation team, we work in an agile way on proofs of concept and pilots to bring new technologies into production safely and responsibly.",
        details: [
          "(Agentic) AI systems that automate processes within Stedin.",
          "Data Science projects, such as detecting faults on edge computers in medium-voltage substations.",
          "AR and XR glasses that provide field technicians with real-time information.",
          "Gas leak detection using drones and sensors, including processing the collected data.",
        ],
      },
    ],
    technologies: ["Agentic AI", "Data Science", "Edge Computing", "AR/XR", "Drones"],
  },
  {
    period: "Oct 2022 - May 2025",
    role: "Project Lead Data Engineer / Scientist",
    company: "Statistics Netherlands",
    location: "The Hague",
    highlights: [
      {
        text:
          "I contributed to making the National Accounts consistent by formulating a mathematical optimization problem and implementing it as a Python package.",
      },
      {
        text:
          "As a project lead and data and software engineer, I also contributed to several IT projects using R and Python.",
        details: [
          "An R package and SQL database containing all processing steps required to prepare quarterly figures for publication.",
          "APIs that make data easily accessible using Python and FastAPI.",
          "CI/CD pipelines for validating and releasing R and Python packages.",
        ],
      },
    ],
    technologies: ["Python", "R", "SQL", "FastAPI", "CI/CD", "Optimization"],
  },
  {
    period: "Nov 2020 - Sep 2022",
    role: "Data Scientist Integrated Capacity Management",
    company: "Erasmus MC",
    location: "Rotterdam",
    highlights: [
      {
        text:
          "The Integrated Capacity Management department optimizes utilization and patient flow throughout the Erasmus MC care chain at operational, tactical, and strategic levels.",
      },
      {
        text:
          "I primarily worked on data engineering, data analysis, and process optimization, supporting and advising several hospital departments through these analyses.",
      },
    ],
    technologies: ["Data Engineering", "Data Analysis", "Process Optimization", "Healthcare"],
  },
  {
    period: "Dec 2018 - Oct 2020",
    role: "Data Scientist",
    company: "Infofolio B.V.",
    location: "Zeist",
    highlights: [
      {
        text:
          "Further developed predictive models for calculating the insured value of residential and commercial properties.",
      },
      {
        text: "Maintained and further developed the GIS database and data warehouse.",
      },
      {
        text:
          "Developed new predictive models, including models for properties managed by homeowners' associations.",
      },
    ],
    technologies: ["Predictive Modeling", "GIS", "Data Warehousing", "Insurance"],
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
