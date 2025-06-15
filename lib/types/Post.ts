export default interface Post {
  // grey matter
  id: number;
  title: string;
  excerpt: string;
  published_date: Date;
  image: string | null;
  tags: string[];

  priority: number;
  hidden: boolean;

  // md body
  body: string;

  // file name
  slug: string | null;
}

export const mapToPost = (raw: any): Post => {
  return {
    id: raw.id,
    title: raw.title ?? "",
    excerpt: raw.excerpt ?? "",
    published_date: new Date(raw.published_date),
    image: raw.image ?? null,
    tags: raw.tags ?? [],
    priority: raw.priority ?? 1000,
    hidden: !!raw.hidden,
    body: raw.body ?? "",
    slug: raw.slug,
  } as Post;
};
