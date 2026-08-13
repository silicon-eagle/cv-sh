import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CommandButton } from "@/components/command-button";
import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalPanel } from "@/components/terminal-panel";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";

const push = vi.fn();
let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}));

function Harness() {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <TerminalShell>
          <CommandButton command="about" label="About" description="Read more" />
          <TerminalPanel />
        </TerminalShell>
      </TerminalProvider>
    </ThemeProvider>
  );
}

describe("terminal interaction", () => {
  beforeEach(() => {
    pathname = "/";
    push.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders the current prompt and blinking cursor", () => {
    render(<Harness />);
    expect(
      screen.getByText(
        /Type ls to list every command, nav to show navigation buttons or help for more info\./,
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId("terminal-prompt")).toHaveTextContent("tim@kelch:~$");
    expect(screen.getByLabelText("Terminal command")).toHaveFocus();
    const cursor = screen.getByTestId("terminal-cursor");
    expect(cursor).toHaveClass("terminal-cursor");
    expect(screen.getByTestId("terminal-cursor-text")).toHaveTextContent("");
  });

  it("moves the block cursor after the typed command", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(screen.getByLabelText("Terminal command"), "help");

    const cursorText = screen.getByTestId("terminal-cursor-text");
    expect(cursorText).toHaveTextContent("help");
    expect(cursorText.nextElementSibling).toBe(screen.getByTestId("terminal-cursor"));
  });

  it("blinks the block cursor only while the command input is focused", () => {
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");
    const cursor = screen.getByTestId("terminal-cursor");

    expect(cursor).toHaveAttribute("data-blinking", "true");
    fireEvent.blur(input);
    expect(cursor).toHaveAttribute("data-blinking", "false");
    fireEvent.focus(input);
    expect(cursor).toHaveAttribute("data-blinking", "true");
  });

  it("focuses the command input when the terminal panel is clicked", () => {
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");
    const panel = screen.getByRole("region", { name: "Interactive terminal" });

    screen.getByRole("button", { name: /about read more/i }).focus();
    expect(input).not.toHaveFocus();
    fireEvent.click(panel);
    expect(input).toHaveFocus();
  });

  it("returns focus to the terminal input after navigation", () => {
    const { rerender } = render(<Harness />);
    const input = screen.getByLabelText("Terminal command");
    screen.getByRole("button", { name: /about read more/i }).focus();
    expect(input).not.toHaveFocus();

    pathname = "/about";
    rerender(<Harness />);

    expect(input).toHaveFocus();
  });

  it("routes clicked and typed navigation commands through the executor", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: /about read more/i }));
    expect(push).toHaveBeenCalledWith("/about");

    await user.type(screen.getByLabelText("Terminal command"), "help{Enter}");
    expect(push).toHaveBeenCalledWith("/help");
  });

  it("routes project slugs from the projects page", async () => {
    const user = userEvent.setup();
    pathname = "/projects";
    render(<Harness />);

    await user.type(
      screen.getByLabelText("Terminal command"),
      "plan-your-chaos{Enter}",
    );

    expect(push).toHaveBeenCalledWith("/projects/plan-your-chaos");
  });

  it("does not route project slugs outside the projects page", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(
      screen.getByLabelText("Terminal command"),
      "plan-your-chaos{Enter}",
    );

    expect(push).not.toHaveBeenCalled();
    expect(
      screen.getByText("plan-your-chaos: command not found"),
    ).toBeInTheDocument();
  });

  it("autocompletes commands and traverses history", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");
    await user.type(input, "abo{Tab}");
    expect(input).toHaveValue("about");
    await user.type(input, "{Enter}help{Enter}");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("help");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("about");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue("help");
  });

  it("prints errors and clears transient output with Ctrl+L", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");
    await user.type(input, "unknown{Enter}");
    expect(screen.getByText("unknown: command not found")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "l", ctrlKey: true });
    expect(screen.queryByText("unknown: command not found")).not.toBeInTheDocument();
  });

  it("lists themes and applies a selected theme command", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");
    await user.type(input, "theme{Enter}");
    expect(screen.getByRole("button", { name: /tokyo night/i })).toBeInTheDocument();
    await user.type(input, "theme gruvbox{Enter}");
    expect(document.documentElement).toHaveAttribute("data-theme", "gruvbox");
    expect(screen.getByText("Theme set to gruvbox.")).toBeInTheDocument();
  });

  it("reports an unsupported theme", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.type(
      screen.getByLabelText("Terminal command"),
      "theme matrix{Enter}",
    );
    expect(screen.getByText(/Unknown theme "matrix"/)).toBeInTheDocument();
  });

  it("prints a philosopher quote and uses Gauß as the fallback", async () => {
    const user = userEvent.setup();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<Harness />);

    await user.type(screen.getByLabelText("Terminal command"), "philosophy{Enter}");

    await waitFor(() => {
      expect(
        screen.getByText(
          "-- Carl Friedrich Gauß, Brief an Wolfgang Bolyai (1808)",
        ),
      ).toBeInTheDocument();
    });
    expect(consoleError).toHaveBeenCalled();
  });

  it("prints custom cows with supplied and default messages", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");

    await user.type(input, "cowsay Hello There{Enter}");
    expect(screen.getByText(/< Hello There >/)).toBeInTheDocument();

    await user.type(input, "cowsay{Enter}");
    expect(screen.getByText(/< Moo! >/)).toBeInTheDocument();
  });

  it("floats a random cat photo outside the terminal output for four seconds", () => {
    vi.useFakeTimers();
    vi.spyOn(Math, "random").mockReturnValue(0);
    render(<Harness />);
    const input = screen.getByLabelText("Terminal command");

    fireEvent.change(input, { target: { value: "cat" } });
    fireEvent.keyDown(input, { key: "Enter" });

    const avatar = screen.getByRole("img", { name: "Cat photo" });
    expect(avatar).toHaveAttribute(
      "src",
      expect.stringContaining("22639b96-d596-4f5d-9619-549043a5a597.webp"),
    );
    expect(
      screen.getByRole("region", { name: "Interactive terminal" }),
    ).not.toContainElement(avatar);
    expect(screen.queryByText("cat", { selector: "span" })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4000));
    expect(
      screen.queryByRole("img", { name: "Cat photo" }),
    ).not.toBeInTheDocument();
  });

  it("shows a clickable email address for the contact command", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(screen.getByLabelText("Terminal command"), "contact{Enter}");

    expect(screen.getByText(/feel free to email me/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "tim.kelch@pm.me" })).toHaveAttribute(
      "href",
      "mailto:tim.kelch@pm.me",
    );
  });

  it("lists every available command with ls", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.type(screen.getByLabelText("Terminal command"), "ls{Enter}");

    expect(screen.getByText(/home\s+Return to the welcome screen/)).toBeInTheDocument();
    expect(screen.getByText(/cowsay \[message\]\s+Let a custom cow speak/)).toBeInTheDocument();
    expect(screen.getByText(/philosophy\s+Print a random philosopher quote/)).toBeInTheDocument();
  });
});
