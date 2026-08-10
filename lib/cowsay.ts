import { cows } from "@/cows";

const MAX_LINE_LENGTH = 42;

function wrapMessage(message: string): string[] {
  const words = message.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return ["Moo!"];

  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    if (!line) {
      line = word;
      continue;
    }

    if (`${line} ${word}`.length <= MAX_LINE_LENGTH) {
      line = `${line} ${word}`;
      continue;
    }

    lines.push(line);
    line = word;
  }

  lines.push(line);
  return lines;
}

function speechBubble(lines: string[]): string {
  const width = Math.max(...lines.map((line) => line.length));
  const top = ` ${"_".repeat(width + 2)}`;
  const bottom = ` ${"-".repeat(width + 2)}`;

  if (lines.length === 1) {
    return [top, `< ${lines[0].padEnd(width)} >`, bottom].join("\n");
  }

  const content = lines.map((line, index) => {
    const paddedLine = line.padEnd(width);
    if (index === 0) return `/ ${paddedLine} \\`;
    if (index === lines.length - 1) return `\\ ${paddedLine} /`;
    return `| ${paddedLine} |`;
  });

  return [top, ...content, bottom].join("\n");
}

export function cowsay(message?: string): string {
  const lines = wrapMessage(message ?? "Moo!");
  const cow = cows[Math.floor(Math.random() * cows.length)];
  return `${speechBubble(lines)}\n${cow.art}`;
}
