import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // or any other theme you like

// add highlight.js support
marked.use(
  markedHighlight({
    langPrefix: "hljs language-", // required for styling
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  })
);

// add `not-prose` class to <pre> tags
/*
function postprocess(html: string) {
  return html.replace(/<pre(?![^>]*class=)/g, '<pre class="not-prose"');
}
marked.use({ hooks: { postprocess } });
*/

// with marked lib
export const parseMdWithMarked = (body: string) => {
  const html = marked.parse(body);
  return html;
};
