export type ProjectStatus = "live" | "in-development" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectAttributes = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: Date;
  mainImage: ProjectImage;
  subImages?: readonly ProjectImage[];
  icon?: ProjectImage;
  type: string;
  role: string;
  stack: readonly string[];
  status: ProjectStatus;
  links?: readonly ProjectLink[];
};

export class Project {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly date: Date;
  readonly mainImage: ProjectImage;
  readonly subImages: readonly ProjectImage[];
  readonly icon?: ProjectImage;
  readonly type: string;
  readonly role: string;
  readonly stack: readonly string[];
  readonly status: ProjectStatus;
  readonly links: readonly ProjectLink[];

  constructor(attributes: ProjectAttributes) {
    this.slug = attributes.slug;
    this.title = attributes.title;
    this.subtitle = attributes.subtitle;
    this.description = attributes.description;
    this.date = attributes.date;
    this.mainImage = attributes.mainImage;
    this.subImages = attributes.subImages ?? [];
    this.icon = attributes.icon;
    this.type = attributes.type;
    this.role = attributes.role;
    this.stack = attributes.stack;
    this.status = attributes.status;
    this.links = attributes.links ?? [];
  }
}
