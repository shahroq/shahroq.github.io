export default interface Post {
  // file name
  slug: string;

  // grey matter
  id: number;
  title: string;
  excerpt: string;
  published_date: Date;
  tags: string[];
  hidden: boolean;

  // md body
  body: string;
}
