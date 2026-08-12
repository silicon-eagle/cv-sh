import { PageLayout } from "@/components/page-layout";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <PageLayout command="projects" title="Projects" eyebrow="What did I build?">
      <ProjectList projects={projects} />
    </PageLayout>
  );
}
