import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import HelpPage from "@/app/help/page";
import HomePage from "@/app/page";
import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
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
  it("keeps the home page simple and advertises three supported actions", () => {
    renderRoute(<HomePage />);
    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByText(/software developer focused on thoughtful/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /themes/i })).toBeInTheDocument();
  });

  it("shows neutral placeholder copy on the about page", () => {
    renderRoute(<AboutPage />);
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(screen.getByText(/placeholder introduction/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
  });

  it("documents only implemented commands and keyboard controls", () => {
    renderRoute(<HelpPage />);
    const commands = screen.getByLabelText("Supported commands");
    for (const command of ["home", "about", "help", "theme", "clear"]) {
      expect(within(commands).getByText(command)).toBeInTheDocument();
    }
    expect(within(commands).queryByText("projects")).not.toBeInTheDocument();
    expect(screen.getByText("Ctrl+L")).toBeInTheDocument();
  });

  it("renders the exact footer and responsive terminal frame", () => {
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
