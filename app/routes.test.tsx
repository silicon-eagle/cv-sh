import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import ExperiencePage from "@/app/experience/page";
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

function toggleNavigation() {
  const input = screen.getByLabelText("Terminal command");
  fireEvent.change(input, { target: { value: "nav" } });
  fireEvent.keyDown(input, { key: "Enter" });
}

describe("portfolio routes", () => {
  it("shows links to every other page command on the home page", () => {
    pathname = "/";
    renderRoute(<HomePage />);
    toggleNavigation();
    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByText(/software developer focused on thoughtful/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /home/i })).not.toBeInTheDocument();
  });

  it("assigns page commands their theme-aware colors", () => {
    pathname = "/";
    renderRoute(<HomePage />);
    toggleNavigation();

    expect(screen.getByRole("button", { name: /about/i })).toHaveStyle({
      "--command-color": "var(--about-accent)",
    });
    expect(screen.getByRole("button", { name: /experience/i })).toHaveStyle({
      "--command-color": "var(--experience-accent)",
    });
    expect(screen.getByRole("button", { name: /help/i })).toHaveStyle({
      "--command-color": "var(--help-accent)",
    });
  });

  it("renders the registered icons in page headings and command buttons", () => {
    pathname = "/about";
    const { container } = renderRoute(<AboutPage />);
    toggleNavigation();

    expect(container.querySelector("header svg")).toBeInTheDocument();
    for (const button of screen.getAllByRole("button")) {
      expect(button.querySelector("svg")).toBeInTheDocument();
    }
  });

  it("shows every page command except the current about page", () => {
    pathname = "/about";
    renderRoute(<AboutPage />);
    toggleNavigation();
    expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Portrait of Tim Kelch" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
    expect(screen.getByText("Tilburg, NL")).toBeInTheDocument();
    expect(screen.getByText("Backend, DevOps, Systems")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /about/i })).not.toBeInTheDocument();
  });

  it("renders the experience timeline and technology cards", () => {
    pathname = "/experience";
    renderRoute(<ExperiencePage />);
    toggleNavigation();

    expect(
      screen.getByRole("region", { name: "Work experience timeline" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /lead python developer/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /software engineer/i })).toBeInTheDocument();
    expect(screen.getAllByLabelText("Technologies")).toHaveLength(4);
    expect(screen.queryByRole("button", { name: /experience/i })).not.toBeInTheDocument();
  });

  it("documents only implemented commands and keyboard controls", () => {
    pathname = "/help";
    renderRoute(<HelpPage />);
    toggleNavigation();
    const commands = screen.getByLabelText("Supported commands");
    for (const command of [
      "home",
      "about",
      "experience",
      "projects",
      "help",
      "nav",
      "theme",
      "clear",
    ]) {
      expect(within(commands).getByText(command)).toBeInTheDocument();
    }
    expect(screen.getByText("Ctrl+L")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /help/i })).not.toBeInTheDocument();
  });

  it("hides page buttons until the nav command toggles them", () => {
    pathname = "/";
    renderRoute(<HomePage />);

    expect(screen.queryByLabelText("Page commands")).not.toBeInTheDocument();
    toggleNavigation();
    expect(screen.getByLabelText("Page commands")).toBeInTheDocument();
    expect(screen.getByText("Navigation shown.")).toBeInTheDocument();
    toggleNavigation();
    expect(screen.queryByLabelText("Page commands")).not.toBeInTheDocument();
    expect(screen.getByText("Navigation hidden.")).toBeInTheDocument();
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
    expect(
      screen.getByRole("region", { name: "Interactive terminal" }),
    ).toBeInTheDocument();
  });
});
