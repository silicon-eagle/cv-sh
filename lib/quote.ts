export type PhilosopherQuote = {
  text: string;
  author: string;
  work?: string;
  year?: string;
};

export const fallbackQuote: PhilosopherQuote = {
  text: `Wahrlich es ist nicht das Wissen,
sondern das Lernen, nicht das Besitzen,
sondern das Erwerben, nicht das
Da-Seyn, sondern das Hinkommen, was
den grössten Genuss gewährt.`,
  author: "Carl Friedrich Gauß",
  work: "Brief an Wolfgang Bolyai",
  year: "1808",
};

export function isPhilosopherQuote(value: unknown): value is PhilosopherQuote {
  if (!value || typeof value !== "object") return false;

  const quote = value as Partial<PhilosopherQuote>;
  return (
    typeof quote.text === "string" &&
    Boolean(quote.text.trim()) &&
    typeof quote.author === "string" &&
    Boolean(quote.author.trim()) &&
    (quote.work === undefined || typeof quote.work === "string") &&
    (quote.year === undefined || typeof quote.year === "string")
  );
}
