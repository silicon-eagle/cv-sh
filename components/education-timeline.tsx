import {
  EducationCard,
  type Education,
} from "@/components/education-card";
import styles from "./education-timeline.module.css";

const education: readonly Education[] = [
  {
    period: "Coming soon",
    qualification: "Education History",
    institution: "Details to follow",
    description:
      "Qualifications, institutions, and areas of study will be added here.",
    subjects: ["Qualifications", "Coursework", "Certifications"],
  },
];

export function EducationTimeline() {
  return (
    <section className={styles.timeline} aria-label="Education timeline">
      {education.map((item) => (
        <EducationCard
          key={`${item.period}-${item.qualification}`}
          education={item}
        />
      ))}
    </section>
  );
}
