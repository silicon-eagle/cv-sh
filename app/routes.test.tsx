import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import EducationPage from "@/app/education/page";
import ExperiencePage from "@/app/experience/page";
import HelpPage from "@/app/help/page";
import HomePage from "@/app/page";
import SnakePage from "@/app/snake/page";
import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/philosopher-quotes", () => ({
  fallbackQuote: {
    text: "Wahrlich es ist nicht das Wissen.",
    author: "Carl Friedrich Gauß",
    work: "Brief an Wolfgang Bolyai",
    year: "1808",
  },
  getRandomQuote: vi.fn().mockResolvedValue({
    text: "Wahrlich es ist nicht das Wissen.",
    author: "Carl Friedrich Gauß",
    work: "Brief an Wolfgang Bolyai",
    year: "1808",
  }),
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
  it("shows links to every other page command on the home page", async () => {
    pathname = "/";
    renderRoute(await HomePage());
    toggleNavigation();
    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome to my little corner/i)).toBeInTheDocument();
    expect(screen.getByText("— Carl Friedrich Gauß")).toBeInTheDocument();
    expect(screen.getByText("Brief an Wolfgang Bolyai · 1808")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /snake/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /home/i })).not.toBeInTheDocument();
  });

  it("assigns page commands their theme-aware colors", async () => {
    pathname = "/";
    renderRoute(await HomePage());
    toggleNavigation();

    expect(screen.getByRole("button", { name: /about/i })).toHaveStyle({
      "--command-color": "var(--about-accent)",
    });
    expect(screen.getByRole("button", { name: /experience/i })).toHaveStyle({
      "--command-color": "var(--experience-accent)",
    });
    expect(screen.getByRole("button", { name: /education/i })).toHaveStyle({
      "--command-color": "var(--education-accent)",
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
    expect(screen.getByText("— Carl Friedrich Gauß").closest("figure")).toHaveAttribute(
      "data-align",
      "right",
    );
    expect(screen.getByText("Brief an Wolfgang Bolyai · 1808")).toBeInTheDocument();
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

  it("renders the education timeline and subject cards", () => {
    pathname = "/education";
    renderRoute(<EducationPage />);
    toggleNavigation();

    expect(
      screen.getByRole("region", { name: "Education timeline" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /education history/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Subjects")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /education/i })).not.toBeInTheDocument();
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
      "education",
      "projects",
      "snake",
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

  it("embeds the snake game in the shared terminal page layout", () => {
    pathname = "/snake";
    renderRoute(<SnakePage />);

    expect(screen.getByRole("heading", { name: "Snake" })).toBeInTheDocument();
    expect(screen.getByLabelText("Snake game")).toBeInTheDocument();
    expect(screen.getByLabelText("Movement controls")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /snake board\. score 0/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Interactive terminal" })).toBeInTheDocument();
    expect(screen.getByLabelText("Snake game")).toHaveFocus();
  });

  it("hides page buttons until the nav command toggles them", async () => {
    pathname = "/";
    renderRoute(await HomePage());

    expect(screen.queryByLabelText("Page commands")).not.toBeInTheDocument();
    toggleNavigation();
    expect(screen.getByLabelText("Page commands")).toBeInTheDocument();
    expect(screen.getByText("Navigation shown.")).toBeInTheDocument();
    toggleNavigation();
    expect(screen.queryByLabelText("Page commands")).not.toBeInTheDocument();
    expect(screen.getByText("Navigation hidden.")).toBeInTheDocument();
  });

  it("renders the exact footer and responsive terminal frame", async () => {
    pathname = "/";
    const homePage = await HomePage();
    render(
      <ThemeProvider>
        <TerminalProvider>
          <TerminalShell>{homePage}</TerminalShell>
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
