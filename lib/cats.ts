import { readdir } from "node:fs/promises";
import path from "node:path";
import type { StaticImageData } from "next/image";

export type CatImage = {
  src: StaticImageData;
  alt: string;
};

const imageExtension = /\.(?:avif|gif|jpe?g|png|webp)$/i;

export async function getCatImages(): Promise<readonly CatImage[]> {
  const directory = path.join(process.cwd(), "public/cats/compressed");
  const filenames = (await readdir(directory))
    .filter((filename) => imageExtension.test(filename))
    .sort();

  return Promise.all(
    filenames.map(async (filename) => {
      const image = await import(`@/public/cats/compressed/${filename}`);
      return { src: image.default as StaticImageData, alt: "Cat photo" };
    }),
  );
}
