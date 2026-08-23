"use client";

import { TerminalPanel } from "@/components/terminal-panel";
import { useTerminal } from "@/components/terminal-provider";

type HideableTerminalProps = {
  className?: string;
};

export function HideableTerminal({ className }: HideableTerminalProps) {
  const { terminalVisible } = useTerminal();

  if (!terminalVisible) return null;

  return (
    <div className={className}>
      <TerminalPanel />
    </div>
  );
}
