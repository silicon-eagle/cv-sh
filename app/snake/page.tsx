import Snake from "@/components/snake";
import { PageLayout } from "@/components/page-layout";

export default function SnakePage() {
  return (
    <PageLayout command="snake" title="Snake" eyebrow="Play a little game!">
      <Snake />
    </PageLayout>
  );
}
