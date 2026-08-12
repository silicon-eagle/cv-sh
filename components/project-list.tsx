import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/project";
import styles from "./project-list.module.css";

type ProjectListProps = {
  projects: readonly Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className={styles.list} aria-label="Projects">
      {projects.map((project) => (
        <Link
          className={styles.project}
          href={`/projects/${project.slug}`}
          key={project.slug}
        >
          <div className={styles.preview}>
            <Image
              src={project.mainImage.src}
              alt={project.mainImage.alt}
              width={project.mainImage.width}
              height={project.mainImage.height}
              sizes="(min-width: 768px) 42vw, 100vw"
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.heading}>
              {project.icon ? (
                <Image
                  src={project.icon.src}
                  alt={project.icon.alt}
                  width={project.icon.width}
                  height={project.icon.height}
                />
              ) : null}
              <h2>{project.title}</h2>
            </div>
            <p>{project.subtitle}</p>
            <time dateTime={project.date.toISOString()}>
              {project.date.getUTCFullYear()}
            </time>
            <span className={styles.open}>
              View project <span aria-hidden="true">-&gt;</span>
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
