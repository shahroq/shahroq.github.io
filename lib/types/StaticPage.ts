export default interface StaticPage {
  // grey matter
  title: string;
  hidden: boolean;

  // md body
  body: string;

  // file name
  slug: string | null;
}

export const mapToStaticPage = (raw: any): StaticPage => {
  return {
    title: raw.title ?? "",
    hidden: !!raw.hidden,
    body: raw.body ?? "",
    slug: raw.slug,
  } as StaticPage;
};
