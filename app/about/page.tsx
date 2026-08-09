import {
  BriefcaseBusiness,
  Cake,
  MapPin,
  Rocket,
  Target,
  UserRound,
} from "lucide-react";
import Image from "next/image";

import { PageLayout } from "@/components/page-layout";
import styles from "./about.module.css";

const details = [
  { label: "Name", value: "Tim Kelch", icon: UserRound },
  { label: "Age", value: "31", icon: Cake },
  { label: "Location", value: "Tilburg, NL", icon: MapPin },
  { label: "Experience", value: "8+ years", icon: BriefcaseBusiness },
  { label: "Focus", value: "Backend, DevOps, Systems", icon: Target },
  { label: "Currently", value: "Building, learning, automating", icon: Rocket },
] as const;

export default function AboutPage() {
  return (
    <PageLayout command="about" title="About" eyebrow="Who am I?">
      <section className={styles.about} aria-label="About Tim Kelch">
        <div className={styles.intro}>
          <div className={styles.portrait}>
            <Image
              src="/profile_pictures/b2fccff4-213c-4568-9337-bc9e9aa3f93b.jpg"
              alt="Portrait of Tim Kelch"
              width={1228}
              height={1614}
              sizes="224px"
              className={styles.image}
            />
          </div>

          <div className={styles.bio}>
            <h2>About Me</h2>
            <p>
              I&apos;m Tim, a software engineer who loves building reliable systems
              and thoughtful developer experiences.
            </p>
            <p>
              I specialize in backend development and infrastructure, turning
              complex problems into simple, maintainable solutions.
            </p>
          </div>
        </div>

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
      </section>
    </PageLayout>
  );
}
