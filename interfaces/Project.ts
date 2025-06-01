import LinkItem from "./LinkItem";

type ProjectCategory =
  | "AI"
  | "React"
  | "Next.js"
  | "Laravel"
  | "ConcreteCMS"
  | "Concrete5 (Legacy)"
  | "OpenCart"
  | "WordPress";

export default interface Project {
  // file name
  slug: string | null;

  // grey matter
  id: number;
  categories: ProjectCategory[];
  title: string;
  description: string;
  image: string | null;
  links: LinkItem[];
  priority: number;
  hidden: boolean;

  // md body
  body: string;
}
