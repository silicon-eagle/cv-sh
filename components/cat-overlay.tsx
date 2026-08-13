"use client";

import Image from "next/image";

import { useTerminal } from "@/components/terminal-provider";
import styles from "./cat-overlay.module.css";

export function CatOverlay() {
  const { catImage } = useTerminal();

  if (!catImage) return null;

  return (
    <div
      key={catImage.displayId}
      className={styles.overlay}
      aria-live="polite"
    >
      <Image
        src={catImage.src}
        alt={catImage.alt}
        fill
        sizes="(min-width: 640px) 16rem, 28vw"
        priority
      />
    </div>
  );
}
