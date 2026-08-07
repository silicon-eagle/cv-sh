import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import HelpPage from "@/app/help/page";
import HomePage from "@/app/page";
import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push: vi.fn() }),
}));

function renderRoute(route: React.ReactNode) {
  return render(
    <ThemeProvider>
      <TerminalProvider>{route}</TerminalProvider>
    </ThemeProvider>,
  );
}

describe("portfolio routes", () => {
  it("shows links to every other page command on the home page", () => {
    pathname = "/";
    renderRoute(<HomePage />);
    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByText(/software developer focused on thoughtful/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /home/i })).not.toBeInTheDocument();
  });

  it("assigns page commands their theme-aware color classes", () => {
    pathname = "/";
    renderRoute(<HomePage />);

    expect(screen.getByRole("button", { name: /about/i }).className).toContain("about");
    expect(screen.getByRole("button", { name: /help/i }).className).toContain("help");
  });

  it("shows every page command except the current about page", () => {
    pathname = "/about";
    renderRoute(<AboutPage />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByText(/placeholder introduction/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /about/i })).not.toBeInTheDocument();
  });

  it("documents only implemented commands and keyboard controls", () => {
    pathname = "/help";
    renderRoute(<HelpPage />);
    const commands = screen.getByLabelText("Supported commands");
    for (const command of ["home", "about", "help", "theme", "clear"]) {
      expect(within(commands).getByText(command)).toBeInTheDocument();
    }
    expect(within(commands).queryByText("projects")).not.toBeInTheDocument();
    expect(screen.getByText("Ctrl+L")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /help/i })).not.toBeInTheDocument();
  });

  it("renders the exact footer and responsive terminal frame", () => {
    pathname = "/";
    render(
      <ThemeProvider>
        <TerminalProvider>
          <TerminalShell><HomePage /></TerminalShell>
        </TerminalProvider>
      </ThemeProvider>,
    );
    expect(screen.getByText("Copyright Tim Kelch")).toBeInTheDocument();
    expect(screen.getByLabelText("Tim Kelch portfolio terminal")).toHaveAttribute(
      "data-responsive-terminal",
      "true",
    );
  });
});
