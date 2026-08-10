import { PageLayout } from "@/components/page-layout";
import { PhilosopherQuote } from "@/components/philosopher-quote";
import { getRandomQuote } from "@/lib/philosopher-quotes";
import styles from "./home.module.css";

export default async function HomePage() {
  const quote = await getRandomQuote();

  return (
    <PageLayout command="home" title="Welcome." eyebrow="Portfolio terminal">
      <p className={styles.intro}>
        Welcome to my little corner of the terminal. I&apos;m Tim, a software
        developer focused on thoughtful, reliable digital experiences.
      </p>
      <PhilosopherQuote quote={quote} />
      <p className={styles.hint}>
        Type <span className={styles.accent}>nav</span> to show page shortcuts, or{" "}
        <span className={styles.accent}>help</span> to list every command.
      </p>
    </PageLayout>
  );
}
