import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tim Kelch — Portfolio",
  description: "The terminal portfolio of Tim Kelch.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TerminalProvider>
            <TerminalShell>{children}</TerminalShell>
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
