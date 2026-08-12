import { Project } from "@/lib/project";

export const projects: readonly Project[] = [
  new Project({
    slug: "plan-your-chaos",
    title: "plan-your-chaos",
    subtitle: "Calendar web app for our home.",
    description:
      `A pixel art styled calendar, with home made pixel art, to plan our chaos. Built with Next.js and Postgres. 
      Deployed on my homelab behind Tialscale access.`,
    date: new Date("2025-01-01T00:00:00.000Z"),
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
