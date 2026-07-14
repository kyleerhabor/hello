import * as client from "$lib/server";
import * as server from "$lib/server/index";
import caddyfileGrammar from "$lib/server/resources/syntaxes/caddyfile.tmLanguage.json";
import rehypeShikiFromHighlighter from "@shikijs/rehype/core";
import { toHtml } from "hast-util-to-html";
import rehypeExternalLinks from "rehype-external-links";
import rehypeMathjax from "rehype-mathjax";
import rehypeMermaid from "rehype-mermaid";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { bundledLanguages, createHighlighter } from "shiki";
import { unified } from "unified";
import { visit } from "unist-util-visit";

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
    const index = tree.children.findIndex(
      (node) => node.type === "element" || node.type === "raw",
    );

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

const CLOBBER_PREFIX = "user-content-";
const CLOBBER_FN_PREFIX = `${CLOBBER_PREFIX}fn-`;

/**
 * @returns {(tree: import("hast").Root, file: import("vfile").VFile) => void}
 */
function rehypeFootnotes() {
  return (tree, file) => {
    const sectionIndex = tree.children.findIndex(
      (node) =>
        node.type === "element"
        && node.tagName === "section"
        && node.properties.dataFootnotes !== undefined,
    );

    if (sectionIndex === -1) {
      file.data.footnotes = [];

      return;
    }

    const section = tree.children[sectionIndex];

    /** @type {Array<{id: number, backref: string, html: string}>} */
    const footnotes = [];
    visit(section, "element", (li) => {
      if (li.tagName !== "li") {
        return;
      }

      const id = li.properties.id;

      if (!id?.startsWith(CLOBBER_FN_PREFIX)) {
        return;
      }

      const number = id.replace(CLOBBER_FN_PREFIX, "");
      let backref = null;

      visit(li, "element", (node) => {
        if (node.properties.dataFootnoteBackref === undefined) {
          return;
        }

        backref = node;

        return visit.EXIT;
      });

      if (!backref) {
        return;
      }

      // Remove the backref from its parent (last block element in the footnote)
      for (const child of li.children) {
        if (child.type !== "element") {
          continue;
        }

        const index = child.children.indexOf(backref);

        if (index === -1) {
          continue;
        }

        child.children.splice(index, 1);

        break;
      }

      const html = li.children.map((n) => toHtml(n)).join("");

      footnotes.push({
        id: Number(number),
        htmlID: id,
        backref: backref.properties.href,
        html,
      });
    });

    tree.children.splice(sectionIndex, 1);
    file.data.footnotes = footnotes;
  };
}

const SHIKI_THEME_LIGHT = "github-light";
const SHIKI_THEME_DARK = "github-dark";
const highlighter = await createHighlighter({
  themes: [SHIKI_THEME_LIGHT, SHIKI_THEME_DARK],
  langs: [
    ...Object.keys(bundledLanguages),
    {
      ...caddyfileGrammar,
      aliases: ["caddyfile"],
    },
  ],
});

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { clobberPrefix: CLOBBER_PREFIX })
  .use(rehypeMermaid, {
    strategy: "img-svg",
    dark: true,
  })
  .use(rehypeSlug)
  .use(rehypeStripFirstH1)
  .use(rehypeExtractHeadings)
  .use(rehypeMathjax)
  .use(
    rehypeShikiFromHighlighter,
    highlighter,
    {
      themes: {
        light: SHIKI_THEME_LIGHT,
        dark: SHIKI_THEME_DARK,
      },
      defaultColor: false,
    },
  )
  .use(rehypeExternalLinks, { rel: ["external", "noopener", "noreferrer", "nofollow"] })
  .use(rehypeFootnotes)
  .use(rehypeStringify);

export async function render(md) {
  const file = await processor.process(md);
  const result = {
    html: String(file),
    headings: file.data.headings,
    footnotes: file.data.footnotes,
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
