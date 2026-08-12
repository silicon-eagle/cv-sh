import { Project } from "@/lib/project";

export const projects: readonly Project[] = [
  new Project({
    slug: "cvsh",
    title: "cv.sh",
    subtitle: "A terminal-inspired portfolio.",
    description:
      "An interactive portfolio that treats navigation as a command-line interface. It combines responsive project and career pages with command history, autocomplete, themes, keyboard controls, and a playable Snake game.",
    date: new Date("2026-08-13T00:00:00.000Z"),
    mainImage: {
      src: "/projects/cvsh/Home.png",
      alt: "CV.SH terminal-inspired portfolio home page",
      width: 1100,
      height: 1230,
    },
    subImages: [
      {
        src: "/projects/cvsh/About.png",
        alt: "CV.SH about page with profile details and biography",
        width: 1100,
        height: 1230,
      },
      {
        src: "/projects/cvsh/Experience.png",
        alt: "CV.SH experience timeline and navigation",
        width: 1100,
        height: 1230,
      },
      {
        src: "/projects/cvsh/Help.png",
        alt: "CV.SH keyboard shortcuts and command help page",
        width: 1100,
        height: 1230,
      },
      {
        src: "/projects/cvsh/Snake.png",
        alt: "CV.SH playable Snake game",
        width: 1100,
        height: 1230,
      },
    ],
    type: "website",
    role: "maker",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "CSS Modules",
      "Vitest",
    ],
    status: "live",
    links: [
    { label: "Live site", href: "https://timkelch.dev" }, 
    {label: "Source code", href: "https://github.com/silicon-eagle/cv-sh"}],
  }),
  new Project({
    slug: "plan-your-chaos",
    title: "plan-your-chaos",
    subtitle: "Calendar web app for our home.",
    description:
      `A pixel art styled calendar, with home made pixel art, to plan our chaos. Built with Next.js and Postgres. 
      Deployed on my homelab behind Tialscale access.`,
    date: new Date("2026-05-01T00:00:00.000Z"),
    mainImage: {
      src: "/projects/plan-your-chaos/plan-your-chaos.png",
      alt: "Plan Your Chaos desktop calendar and upcoming events view",
      width: 1569,
      height: 1182,
    },
    subImages: [
      {
        src: "/projects/plan-your-chaos/plan-your-chaos-mobile.PNG",
        alt: "Plan Your Chaos mobile calendar and upcoming events view",
        width: 1206,
        height: 2622,
      },
      {
        src: "/projects/plan-your-chaos/logoREADME.png",
        alt: "Plan Your Chaos pixel art logo",
        width: 880,
        height: 320,
      },
    ],
    icon: {
      src: "/projects/plan-your-chaos/logoSmall.png",
      alt: "",
      width: 32,
      height: 32,
    },
    type: "website",
    role: "maker",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres", "Drizzle ORM"],
    status: "live",
    links: [
      {
        label: "Source code",
        href: "https://github.com/silicon-eagle/plan-your-chaos",
      },
    ],
  }),
];

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
