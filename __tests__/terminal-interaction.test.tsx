import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CommandButton } from "@/components/command-button";
import { TerminalProvider } from "@/components/terminal-provider";
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
    expect(screen.getByTestId("terminal-cursor")).toHaveClass("terminal-cursor");
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
    await user.type(input, "projects{Enter}");
    expect(screen.getByText("projects: command not found")).toBeInTheDocument();
    fireEvent.keyDown(input, { key: "l", ctrlKey: true });
    expect(screen.queryByText("projects: command not found")).not.toBeInTheDocument();
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
