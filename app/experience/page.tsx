import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageLayout } from "@/components/page-layout";

export default function ExperiencePage() {
  return (
    <PageLayout command="experience" title="Experience" eyebrow="What did I do?">
      <ExperienceTimeline />
    </PageLayout>
  );
}
