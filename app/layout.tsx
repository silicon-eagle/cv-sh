import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { TerminalProvider } from "@/components/terminal-provider";
import { TerminalShell } from "@/components/terminal-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { getCatImages } from "@/lib/cats";

import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tim Kelch — Portfolio",
  description: "The terminal portfolio of Tim Kelch.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const catImages = await getCatImages();

  return (
    <html
      lang="en"
      className={ibmPlexMono.variable}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <TerminalProvider catImages={catImages}>
            <TerminalShell>{children}</TerminalShell>
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
