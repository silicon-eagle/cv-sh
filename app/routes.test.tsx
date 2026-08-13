import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AboutPage from "@/app/about/page";
import EducationPage from "@/app/education/page";
import ExperiencePage from "@/app/experience/page";
import HelpPage from "@/app/help/page";
import HomePage from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import SkillsPage from "@/app/skills/page";
import SnakePage from "@/app/snake/page";
import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";
import packageJson from "@/package.json";

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
  getRandomQuote: vi.fn(),
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
    expect(screen.getByRole("heading", { name: /hello, i'm tim/i })).toBeInTheDocument();
    expect(screen.getByText(/developer by profession/i)).toBeInTheDocument();
    expect(screen.queryByText("— Carl Friedrich Gauß")).not.toBeInTheDocument();
    const pageCommands = screen.getByLabelText("Page commands");
    expect(within(pageCommands).getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(within(pageCommands).getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(within(pageCommands).queryByRole("button", { name: /snake/i })).not.toBeInTheDocument();
    expect(within(pageCommands).queryByRole("button", { name: /home/i })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "help" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "nav" })).toBeInTheDocument();
  });

  it("renders strengths, skills, hobbies, and languages", () => {
    pathname = "/skills";
    renderRoute(<SkillsPage />);

    expect(screen.getByRole("heading", { name: /strengths/i })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: /skills/i })).toHaveLength(2);
    expect(screen.getByRole("heading", { name: /hobbies/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /languages/i })).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("Docker")).toBeInTheDocument();
    expect(screen.getByText("Dutch")).toBeInTheDocument();
    expect(screen.getByLabelText("4 out of 5")).toBeInTheDocument();
  });

  it("assigns page commands their theme-aware colors", async () => {
    pathname = "/";
    renderRoute(await HomePage());
    toggleNavigation();
    const pageCommands = screen.getByLabelText("Page commands");

    expect(within(pageCommands).getByRole("button", { name: /about/i })).toHaveStyle({
      "--command-color": "var(--about-accent)",
    });
    expect(within(pageCommands).getByRole("button", { name: /experience/i })).toHaveStyle({
      "--command-color": "var(--experience-accent)",
    });
    expect(within(pageCommands).getByRole("button", { name: /education/i })).toHaveStyle({
      "--command-color": "var(--education-accent)",
    });
    expect(within(pageCommands).getByRole("button", { name: /help/i })).toHaveStyle({
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
    expect(
      screen.getByRole("heading", { name: /digital innovation developer/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /data scientist.*infofolio/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /project lead.*statistics netherlands/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Gas leak detection using drones", { exact: false })).toBeInTheDocument();
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
      screen.getByRole("heading", {
        name: /business analytics.*tilburg university/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /b\.sc\. mathematics.*radboud/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/the language of the natural numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/the capability approach/i)).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Extracurricular timeline" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/fourth out of 278 participating teams/i)).toBeInTheDocument();
    expect(screen.getByText(/a framework for common knowledge/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText("Subjects")).toHaveLength(7);
    expect(screen.queryByRole("button", { name: /education/i })).not.toBeInTheDocument();
  });

  it("lists projects with their main image and detail link", () => {
    pathname = "/projects";
    renderRoute(<ProjectsPage />);

    expect(
      screen.getByRole("heading", { name: "plan-your-chaos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Plan Your Chaos desktop calendar and upcoming events view",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /plan-your-chaos/i })).toHaveAttribute(
      "href",
      "/projects/plan-your-chaos",
    );
    expect(screen.getByRole("heading", { name: "cv.sh" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cv\.sh/i })).toHaveAttribute(
      "href",
      "/projects/cvsh",
    );
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
      "skills",
      "projects",
      "projects/<project>",
      "snake",
      "help",
      "nav",
      "theme",
      "contact",
      "cat",
      "cowsay [message]",
      "philosophy",
      "ls",
      "clear",
    ]) {
      expect(within(commands).getByText(command)).toBeInTheDocument();
    }
    const keyboard = screen.getByLabelText("Keyboard controls");
    expect(within(keyboard).getByText("Ctrl+L")).toBeInTheDocument();
    expect(
      keyboard.compareDocumentPosition(commands) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /help/i })).not.toBeInTheDocument();
  });

  it("embeds the snake game in the shared terminal page layout", () => {
    pathname = "/snake";
    renderRoute(<SnakePage />);

    const heading = screen.getByRole("heading", { name: "Snake" });
    expect(heading).toBeInTheDocument();
    expect(screen.getByLabelText("Snake game")).toBeInTheDocument();
    expect(screen.getByLabelText("Movement controls")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /snake board\. score 0/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    const terminal = screen.getByRole("region", { name: "Interactive terminal" });
    expect(terminal).toBeInTheDocument();
    expect(
      heading.compareDocumentPosition(terminal) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
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

  it("toggles page commands from the mobile menu button", async () => {
    pathname = "/";
    renderRoute(await HomePage());
    toggleNavigation();

    const openMenu = screen.getByRole("button", {
      name: "Open page navigation",
    });
    expect(openMenu).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(openMenu);
    const closeMenu = screen.getByRole("button", {
      name: "Close page navigation",
    });
    expect(closeMenu).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("page-command-list")).toHaveAttribute(
      "data-open",
      "true",
    );
  });

  it("renders the responsive terminal frame and status bar", async () => {
    pathname = "/";
    const homePage = await HomePage();
    render(
      <ThemeProvider>
        <TerminalProvider>
          <TerminalShell>{homePage}</TerminalShell>
        </TerminalProvider>
      </ThemeProvider>,
    );
    expect(screen.getByLabelText("Terminal status")).toBeInTheDocument();
    expect(screen.getByText("HOME")).toBeInTheDocument();
    expect(screen.getByText("Tilburg, NL")).toBeInTheDocument();
    expect(screen.getByText(`v${packageJson.version}`)).toBeInTheDocument();
    expect(screen.getByText("ONLINE")).toBeInTheDocument();
    expect(screen.getByLabelText("Tim Kelch portfolio terminal")).toHaveAttribute(
      "data-responsive-terminal",
      "true",
    );
    expect(
      screen.getByRole("region", { name: "Interactive terminal" }),
    ).toBeInTheDocument();
  });
});
