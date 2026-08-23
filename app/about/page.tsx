import Image from "next/image";
import { Briefcase } from "pixelarticons/react/Briefcase";
import { Cake } from "pixelarticons/react/Cake";
import { Contact } from "pixelarticons/react/Contact";
import { GitBranch } from "pixelarticons/react/GitBranch";
import { Globe } from "pixelarticons/react/Globe";
import { Mail } from "pixelarticons/react/Mail";
import { MapPin } from "pixelarticons/react/MapPin";
import { Target } from "pixelarticons/react/Target";
import { ToolCase } from "pixelarticons/react/ToolCase";
import { User } from "pixelarticons/react/User";

import { getAge, getDaysSince, formatDays } from "@/lib/utils";
import { PageLayout } from "@/components/page-layout";
import styles from "./about.module.css";

const age: number = getAge()
const start_experience = new Date(2020, 11, 1);
const experience: number = getDaysSince(start_experience)

const details = [
  { label: "Name", value: "Tim Kelch", icon: User },
  { label: "Age", value: age, icon: Cake },
  { label: "Location", value: "Tilburg, NL", icon: MapPin },
  { label: "Working Experience", value: formatDays(experience), icon: Briefcase },
  { label: "Focus", value: "Data Engineering, ML, AI, Backend, DevOps", icon: Target },
  { label: "Currently", value: "Building, learning, innovating, automating", icon: ToolCase },
] as const;

const links = [
  { label: "GitHub", href: "https://github.com/silicon-eagle", icon: GitBranch },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tim-kelch/", icon: Contact },
  { label: "Email", href: "mailto:tim.kelch@proton.me", icon: Mail },
  { label: "Website", href: "https://timkelch.dev", icon: Globe },
] as const;

export default function AboutPage() {
  return (
    <PageLayout command="about" title="About" eyebrow="Who am I?">
      <section className={styles.about} aria-label="About Tim Kelch">
        <dl className={styles.details}>
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className={styles.detail}>
              <dt>
                <Icon aria-hidden="true" />
                <span>{label}:</span>
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.intro}>
          <div className={styles.bio}>
            <div className={styles.portrait}>
              <Image
                src="/profile_pictures/b2fccff4-213c-4568-9337-bc9e9aa3f93b.jpg"
                alt="Portrait of Tim Kelch"
                width={1228}
                height={1614}
                sizes="(min-width: 768px) 40vw, 192px"
                className={styles.image}
              />
            </div>

            <ul className={styles.links} aria-label="Links">
              {links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={styles.link}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h2>About Me</h2>
            <p>
              My name is Tim Kelch, I&apos;m currently living in the beautiful city of
              Tilburg (Noord Brabant) with my girlfriend and two cats.
              I&apos;m a developer, data scientist, engineer, and philosopher with
              a background in mathematics, operations research, and philosophy. I
              studied both Mathematics and Philosophy at Radboud University before
              specialising further in Econometrics (Business Analytics &amp; Operations Research).
              Philosophy has stuck with me as much more than something I once
              studied: it remains one of my main interests and strongly influences
              the way I like to think about problems, technology, and the
              assumptions behind the things we build.
            </p>
            <p>
              Professionally, I enjoy working where analytical thinking and
              software engineering come together: turning complex ideas into
              practical, reliable solutions and automating processes wherever
              technology can genuinely make things better. Over the years I&apos;ve
              worked across healthcare, official statistics, and the energy sector,
              on everything from mathematical optimisation and data pipelines to
              APIs, CI/CD, and experimental technologies such as AI, edge
              computing, and sensor systems.
            </p>
            <p>
              These days I increasingly gravitate towards data/ software engineering,
              architecture, and DevOps. I like understanding systems end-to-end
              rather than treating code as an isolated piece of the puzzle, and
              I&apos;m happiest when I can combine technical depth with
              collaboration: discussing ideas, giving technical direction, sharing
              knowledge, and actually getting things into use.
            </p>
            <p>
              Outside of work, that curiosity has turned into a growing homelab
              obsession. I run and host my own services, experiment with
              networking, containers, CI/CD, and infrastructure, and generally
              enjoy figuring out how all the pieces fit together. It&apos;s partly a
              hobby, partly a playground, and usually an excuse to build something.
            </p>
            <p>
              When I&apos;m not behind a keyboard, I like making and listening to
              music - mostly guitar and drums - and doing things with my hands.
              Sewing, painting, drawing, cooking, or just making something from
              scratch are a nice counterbalance to spending so much time in the
              digital world. I also love hiking, biking, bouldering and running for 
              getting some exercise. And when I&apos;m not making something, 
              there&apos;s a good chance I&apos;m reading or thinking about philosophy.
            </p>
          </div>
        </div>

        {/* <PhilosopherQuote quote={fallbackQuote} align="right" /> */}
      </section>
    </PageLayout>
  );
}
