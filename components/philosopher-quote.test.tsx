import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PhilosopherQuote } from "@/components/philosopher-quote";

describe("PhilosopherQuote", () => {
  it("renders the resolved quote without a client-side swap", () => {
    render(
      <PhilosopherQuote
        quote={{
          text: "The unexamined life is not worth living.",
          author: "Socrates",
          work: "Apology",
          year: "399 BC",
        }}
      />,
    );

    expect(screen.getByText("— Socrates")).toBeInTheDocument();
    expect(screen.getByText("Apology · 399 BC")).toBeInTheDocument();
  });
});
