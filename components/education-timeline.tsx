import {
  EducationCard,
  type Education,
} from "@/components/education-card";
import styles from "./education-timeline.module.css";

const education: readonly Education[] = [
  {
    period: "Sep 2019 - Nov 2020",
    qualification: "M.Sc. Business Analytics & Operations Research",
    institution: "Tilburg University",
    location: "Tilburg",
    highlights: [
      "This master's program focused on Data Science, Operations Research, and Supply Chain Analytics.",
      "GPA: 8.",
      "Thesis: “A decomposition based solution approach for solving a large scale rich vehicle routing problem”. Grade: 8.5.",
    ],
    subjects: ["Data Science", "Operations Research", "Supply Chain Analytics"],
  },
  {
    period: "Feb 2015 - Oct 2018",
    qualification: "B.Sc. Mathematics",
    institution: "Radboud University",
    location: "Nijmegen",
    highlights: [
      "A pre-master's program in Econometrics formed part of the minor for this bachelor's degree.",
      "GPA: 7.5.",
      "Thesis: “Stochastic Scheduling Problems and the Power of LP formulations” at the Applied Stochastics department. Grade: 7.5.",
    ],
    subjects: ["Mathematics", "Econometrics", "Applied Stochastics"],
  },
  {
    period: "Sep 2013 - Sep 2018",
    qualification: "B.A. Philosophy",
    institution: "Radboud University",
    location: "Nijmegen",
    highlights: [
      "GPA: 8.5.",
      "Thesis: “The Language of the Natural Numbers” at the Philosophy of Language and Logic department. Grade: 9.",
    ],
    subjects: ["Philosophy", "Language", "Logic"],
  },
  {
    period: "Sep 2008 - Aug 2013",
    qualification: "Pre-University Education (VWO)",
    institution: "Mill Hill College",
    location: "Goirle",
    highlights: [
      "GPA: 8.",
      "Economics and Philosophy graduation project: “The Capability Approach”. Grade: 10.",
      "Profile: Economics, Culture & Society.",
    ],
    subjects: ["Economics", "Culture", "Social Studies", "Philosophy"],
  },
];

const extracurricular: readonly Education[] = [
  {
    period: "2019",
    qualification: "Member of the INFORMS 2020 Tilburg University Team",
    institution: "Tilburg University",
    location: "Tilburg",
    highlights: [
      "Competed in the INFORMS O.R. & Analytics Student Team Competition as part of a Tilburg University team.",
      "Our team placed fourth out of 278 participating teams.",
    ],
    subjects: ["Operations Research", "Analytics", "Team Competition"],
  },
  {
    period: "2015 - 2018",
    qualification: "Disciplinary Bachelor's Honours Program",
    institution: "Radboud University",
    location: "Nijmegen",
    highlights: [
      "Completed at the Philosophy of Language and Logic department.",
      "Thesis: “A Framework for Common Knowledge”. Grade: 9.",
    ],
    subjects: ["Honours", "Philosophy of Language", "Logic"],
  },
  {
    period: "2014 - 2015",
    qualification: "Interdisciplinary First-Year Honours Program",
    institution: "Radboud University",
    location: "Nijmegen",
    highlights: [
      "Completed an interdisciplinary honours program alongside the first year of the bachelor's degree.",
    ],
    subjects: ["Honours", "Interdisciplinary"],
  },
];

function Timeline({
  label,
  items,
}: {
  label: string;
  items: readonly Education[];
}) {
  return (
    <section aria-label={`${label} timeline`}>
      <h2 className={styles.sectionTitle}>{label}</h2>
      <div className={styles.timeline}>
        {items.map((item) => (
          <EducationCard
            key={`${item.period}-${item.qualification}`}
            education={item}
          />
        ))}
      </div>
    </section>
  );
}

export function EducationTimeline() {
  return (
    <div className={styles.sections}>
      <Timeline label="Education" items={education} />
      <Timeline label="Extracurricular" items={extracurricular} />
    </div>
  );
}
