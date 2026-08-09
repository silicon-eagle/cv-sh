import { ExperienceTimeline } from "@/components/experience-timeline";
import { PageCommandButtons } from "@/components/page-command-buttons";
import { PageHeading } from "@/components/page-heading";

export default function ExperiencePage() {
  return (
    <div>
      <PageHeading command="experience" title="Experience" eyebrow="What did I do?" />
      <PageCommandButtons />
      <ExperienceTimeline />
    </div>
  );
}
