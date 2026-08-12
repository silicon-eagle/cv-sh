import Image from "next/image";
import { Brackets } from "pixelarticons/react/Brackets";
import { Calendar } from "pixelarticons/react/Calendar";
import { Globe } from "pixelarticons/react/Globe";
import { User } from "pixelarticons/react/User";

import type { Project } from "@/lib/project";
import styles from "./project-details.module.css";

const statusLabels: Record<Project["status"], string> = {
  live: "live",
  "in-development": "in development",
  archived: "archived",
};

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <article className={styles.project}>
      <dl className={styles.metadata}>
        <div>
          <dt><Globe aria-hidden="true" />type</dt>
          <dd>{project.type}</dd>
        </div>
        <div>
          <dt><User aria-hidden="true" />role</dt>
          <dd>{project.role}</dd>
        </div>
        <div>
          <dt><Brackets aria-hidden="true" />stack</dt>
          <dd>{project.stack.join(", ")}</dd>
        </div>
        <div>
          <dt><Calendar aria-hidden="true" />year</dt>
          <dd>
            <time dateTime={project.date.toISOString()}>
              {project.date.getUTCFullYear()}
            </time>
          </dd>
        </div>
        <div>
          <dt><span aria-hidden="true">+</span>status</dt>
          <dd className={styles.status}>
            <span data-status={project.status} aria-hidden="true" />
            {statusLabels[project.status]}
          </dd>
        </div>
      </dl>

      <div className={styles.mainImage}>
        <Image
          src={project.mainImage.src}
          alt={project.mainImage.alt}
          width={project.mainImage.width}
          height={project.mainImage.height}
          sizes="(min-width: 768px) 55vw, 100vw"
          priority
        />
      </div>

      <p className={styles.description}>{project.description}</p>

      {project.links.length > 0 ? (
        <nav className={styles.links} aria-label={`${project.title} links`}>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              <span aria-hidden="true">&gt;</span>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}

      {project.subImages.length > 0 ? (
        <section className={styles.gallery} aria-label={`${project.title} gallery`}>
          <h2>Gallery</h2>
          <div className={styles.galleryImages}>
            {project.subImages.map((image) => (
              <div className={styles.subImage} key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 768px) 45vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
