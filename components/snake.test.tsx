import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Snake from "@/components/snake";

function headIndex() {
  const board = screen.getByRole("img", { name: /snake board/i });
  return Array.from(board.children).findIndex(
    (cell) => cell.getAttribute("data-snake") === "head",
  );
}

function advanceTick() {
  act(() => {
    vi.advanceTimersByTime(120);
  });
}

describe("Snake controls", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("moves with Vim keys and restarts with r", () => {
    render(<Snake />);
    const game = screen.getByLabelText("Snake game");

    expect(game).toHaveFocus();
    expect(headIndex()).toBe(63);

    fireEvent.keyDown(game, { key: "j" });
    advanceTick();
    expect(headIndex()).toBe(93);

    fireEvent.keyDown(game, { key: "h" });
    advanceTick();
    expect(headIndex()).toBe(92);

    fireEvent.keyDown(game, { key: "r" });
    expect(headIndex()).toBe(63);

    fireEvent.keyDown(game, { key: "K" });
    advanceTick();
    expect(headIndex()).toBe(33);

    fireEvent.keyDown(game, { key: "r" });
    fireEvent.keyDown(game, { key: "l" });
    advanceTick();
    expect(headIndex()).toBe(64);
  });
});
