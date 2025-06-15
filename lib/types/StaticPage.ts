export default interface StaticPage {
  // grey matter
  title: string;
  hidden: boolean;

  // md body
  body: string;

  // file name
  slug: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapToStaticPage = (raw: any): StaticPage => {
  return {
    title: raw.title ?? "",
    hidden: !!raw.hidden,
    body: raw.body ?? "",
    slug: raw.slug,
  } as StaticPage;
};
