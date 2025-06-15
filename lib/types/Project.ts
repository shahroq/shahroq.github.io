import LinkItem from "./LinkItem";
import Tag from "./Tag";

export default interface Project {
  // grey matter
  id: number;
  title: string;
  excerpt: string;
  published_date: Date | null;
  image: string | null;
  tags: Tag[];
  links: LinkItem[];

  priority: number;
  hidden: boolean;

  // md body
  body: string;

  // file name
  slug: string | null;
}

export const mapToProject = (raw: any): Project => {
  return {
    id: raw.id,
    title: raw.title ?? "",
    excerpt: raw.excerpt ?? "",
    published_date: new Date(raw.published_date),
    image: raw.image ?? null,
    tags: raw.tags ?? [],
    links: raw.links ?? [],
    priority: raw.priority ?? 1000,
    hidden: !!raw.hidden,
    body: raw.body ?? "",
    slug: raw.slug,
  } as Project;
};
