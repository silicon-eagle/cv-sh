import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

  it("renders the current prompt and blinking cursor", () => {
    render(<Harness />);
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
});
