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
import rehypeSlug from "rehype-slug";
import rehypeMermaid from "rehype-mermaid";

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

/**
 * @param {import("hast").Node} node
 */
function collectHastText(node) {
  const stack = [node];
  let text = "";

  while (stack.length > 0) {
    const node = stack.pop();

    if (node.type === "text") {
      text += node.value;
    } else if (node.type === "element") {
      stack.push(...node.children.toReversed());
    }
  }

  return text;
}

const DEPTH = new Map([
  ["h2", 2],
  ["h3", 3],
  ["h4", 4],
  ["h5", 5],
  ["h6", 6],
]);

/**
 * @returns {(tree: import("hast").Root, file: import("vfile").VFile) => void}
 */
function rehypeExtractHeadings() {
  return (tree, file) => {
    file.data.headings = tree.children
      .filter((node) => node.type === "element" && DEPTH.has(node.tagName))
      .map((node) => ({
        depth: DEPTH.get(node.tagName),
        text: collectHastText(node),
        id: node.properties.id,
      }));
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeMermaid, {
    strategy: "img-svg",
    dark: true,
  })
  .use(rehypeSlug)
  .use(rehypeStripFirstH1)
  .use(rehypeExtractHeadings)
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
  const file = await processor.process(md);
  const result = {
    html: String(file),
    headings: file.data.headings,
  };

  return result;
}

export function renderArticle(article) {
  return {
    [client.KEY_DATA_ARTICLE_ID]: article[server.KEY_DATA_ARTICLE_ID],
    [client.KEY_DATA_ARTICLE_TITLE]: article[server.KEY_DATA_ARTICLE_TITLE],
    [client.KEY_DATA_ARTICLE_DATE]: article[server.KEY_DATA_ARTICLE_DATE],
  };
}
