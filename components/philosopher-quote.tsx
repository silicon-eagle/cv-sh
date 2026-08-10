import type { PhilosopherQuote as Quote } from "@/lib/quote";
import styles from "./philosopher-quote.module.css";

type PhilosopherQuoteProps = {
  quote: Quote;
  align?: "left" | "right";
};

export function PhilosopherQuote({
  quote,
  align = "left",
}: PhilosopherQuoteProps) {
  return (
    <figure
      className={`${styles.quote} ${align === "right" ? styles.right : ""}`.trim()}
      data-align={align}
    >
      <blockquote>
        <p>{quote.text}</p>
      </blockquote>
      <figcaption>
        <span>— {quote.author}</span>
        {quote.work || quote.year ? (
          <span className={styles.quoteSource}>
            {[quote.work, quote.year].filter(Boolean).join(" · ")}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
