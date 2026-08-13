"use server";

import { getRandomQuote } from "@/lib/philosopher-quotes";

export async function getPhilosopherQuote() {
  return getRandomQuote();
}
