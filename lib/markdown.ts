import { marked } from "marked";

export const parseMdMarked = (body: string) => {
  const html = marked(body);
  return html;
};
