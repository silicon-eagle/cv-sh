import { getRandomQuote } from "@/lib/philosopher-quotes";

export async function GET() {
  const quote = await getRandomQuote();

  return Response.json(quote, {
    headers: { "Cache-Control": "no-store" },
  });
}
