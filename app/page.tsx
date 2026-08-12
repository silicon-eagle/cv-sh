import { HomeTerminal } from "@/components/home-terminal";
import { PageLayout } from "@/components/page-layout";

export default function HomePage() {
  return (
    <PageLayout command="home" title="Home" eyebrow="Portfolio terminal">
      <HomeTerminal />
    </PageLayout>
  );
}
