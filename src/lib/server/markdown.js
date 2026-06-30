import * as client from "$lib/server";
import * as server from "$lib/server/index";
import rehypeShiki from "@shikijs/rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeMathjax from "rehype-mathjax";
import remarkMath from "remark-math";

/**
 * Strips the first <h1> from the tree if it's the first content element.
 *
 * Node types:
 * - `element`: Markdown blocks (`<p>`, `<h1>`, `<pre>`, etc.)
 * - `text`: Whitespace only
 * - `raw`: Inline HTML
 * - `comment`: Not produced
 * - `doctype`: Not produced
 */
function rehypeStripFirstH1() {
  /**
   * @param {import('hast').Root} tree
   */
  return (tree) => {
    const index = tree.children.findIndex((node) => node.type === "element" || node.type == "raw");

    if (index === -1) {
      return;
    }

    const node = tree.children[index];

    if (node.type != "element" || node.tagName != "h1") {
      return;
    }

    tree.children.splice(index, 1);
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeStripFirstH1)
  .use(rehypeMathjax)
  .use(rehypeShiki, {
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })
  .use(rehypeExternalLinks, {
    target: "_blank",
    rel: ["external", "noopener", "noreferrer", "nofollow"],
  })
  .use(rehypeStringify);

export async function render(md) {
  return String(await processor.process(md));
}

export function renderArticle(article) {
  return {
    [client.KEY_DATA_ARTICLE_ID]: article[server.KEY_DATA_ARTICLE_ID],
    [client.KEY_DATA_ARTICLE_TITLE]: article[server.KEY_DATA_ARTICLE_TITLE],
    [client.KEY_DATA_ARTICLE_DATE]: article[server.KEY_DATA_ARTICLE_DATE],
  };
}
