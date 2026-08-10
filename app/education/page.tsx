import { EducationTimeline } from "@/components/education-timeline";
import { PageLayout } from "@/components/page-layout";

export default function EducationPage() {
  return (
    <PageLayout command="education" title="Education" eyebrow="What did I study?">
      <EducationTimeline />
    </PageLayout>
  );
}
