import { marked } from "marked";

// todo: abstraction
export const parseMdWithMarked = (body: string) => {
  const html = marked(body);
  return html;
};
