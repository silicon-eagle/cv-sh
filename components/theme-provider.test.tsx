import { act, render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { describe, expect, it, vi } from "vitest";

import { ThemeProvider, useTheme } from "@/components/theme-provider";

function ThemeProbe() {
  const { theme, setTheme } = useTheme();

  return (
    <button type="button" onClick={() => setTheme("gruvbox")}>
      {theme}
    </button>
  );
}

function EffectProbe() {
  const { setTheme } = useTheme();
  useEffect(() => setTheme("tokyo-night"), [setTheme]);
  return null;
}

describe("ThemeProvider", () => {
  it("uses Catppuccin by default", () => {
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    expect(screen.getByRole("button")).toHaveTextContent("catppuccin");
    expect(document.documentElement).toHaveAttribute("data-theme", "catppuccin");
  });

  it("restores a saved supported theme", () => {
    window.localStorage.setItem("cv-sh-theme", "catppuccin-light");
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    expect(screen.getByRole("button")).toHaveTextContent("catppuccin-light");
    expect(document.documentElement).toHaveAttribute("data-theme", "catppuccin-light");
  });

  it("persists theme changes", () => {
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    act(() => screen.getByRole("button").click());
    expect(window.localStorage.getItem("cv-sh-theme")).toBe("gruvbox");
    expect(document.documentElement).toHaveAttribute("data-theme", "gruvbox");
  });

  it("falls back from an invalid saved theme", () => {
    window.localStorage.setItem("cv-sh-theme", "matrix");
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>);
    expect(screen.getByRole("button")).toHaveTextContent("catppuccin");
  });

  it("still applies a theme when storage throws", () => {
    vi.spyOn(window.localStorage, "setItem").mockImplementation(() => {
      throw new Error("storage unavailable");
    });
    render(<ThemeProvider><EffectProbe /></ThemeProvider>);
    expect(document.documentElement).toHaveAttribute("data-theme", "tokyo-night");
    vi.restoreAllMocks();
  });
});
