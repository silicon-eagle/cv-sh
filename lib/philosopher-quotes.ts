import {
  fallbackQuote,
  type PhilosopherQuote,
} from "@/lib/quote";

export { fallbackQuote };
export type { PhilosopherQuote };

type ApiQuote = {
  quote: string;
  work?: string;
  year?: string;
  philosopher: {
    id: string;
  };
};

type ApiPhilosopher = {
  id: string;
  name: string;
};

function isApiQuote(value: unknown): value is ApiQuote {
  if (!value || typeof value !== "object") return false;

  const quote = value as Partial<ApiQuote>;
  return (
    typeof quote.quote === "string" &&
    Boolean(quote.quote.trim()) &&
    typeof quote.philosopher?.id === "string"
  );
}

function isApiPhilosopher(value: unknown): value is ApiPhilosopher {
  if (!value || typeof value !== "object") return false;

  const philosopher = value as Partial<ApiPhilosopher>;
  return (
    typeof philosopher.id === "string" &&
    typeof philosopher.name === "string" &&
    Boolean(philosopher.name.trim())
  );
}

export async function getRandomQuote(): Promise<PhilosopherQuote> {
  try {
    const [quotesResponse, philosophersResponse] = await Promise.all([
      fetch("https://philosophersapi.com/api/quotes", {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(2500),
      }),
      fetch("https://philosophersapi.com/api/philosophers", {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(2500),
      }),
    ]);

    if (!quotesResponse.ok || !philosophersResponse.ok) {
      throw new Error(
        `Philosophers API returned ${quotesResponse.status}/${philosophersResponse.status}`,
      );
    }

    const quotes: unknown = await quotesResponse.json();
    const philosophers: unknown = await philosophersResponse.json();

    if (!Array.isArray(quotes) || !Array.isArray(philosophers)) {
      throw new Error("Philosophers API returned an unexpected response shape");
    }

    const namesById = new Map(
      philosophers
        .filter(isApiPhilosopher)
        .map((philosopher) => [philosopher.id, philosopher.name]),
    );
    const availableQuotes = quotes
      .filter(isApiQuote)
      .map((quote) => ({
        text: quote.quote,
        author: namesById.get(quote.philosopher.id),
        work: quote.work?.trim() || undefined,
        year: quote.year?.trim() || undefined,
      }))
      .filter(
        (
          quote,
        ): quote is PhilosopherQuote & {
          author: string;
          work: string | undefined;
          year: string | undefined;
        } =>
          typeof quote.author === "string",
      );

    if (availableQuotes.length === 0) {
      throw new Error("Philosophers API returned no usable quotes");
    }

    return availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
  } catch (error) {
    console.error("Unable to load a philosopher quote", error);
    return fallbackQuote;
  }
}
