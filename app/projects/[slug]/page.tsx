import { notFound } from "next/navigation";

import { PageLayout } from "@/components/page-layout";
import { ProjectDetails } from "@/components/project-details";
import { findProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) notFound();

  return (
    <PageLayout
      command={`projects/${project.slug}`}
      title={project.title}
      eyebrow={project.subtitle}
    >
      <ProjectDetails project={project} />
    </PageLayout>
  );
}
