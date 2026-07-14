import * as client from "$lib/server";
import * as server from "$lib/server/index";
import { render, renderArticle } from "$lib/server/markdown";
import { error } from "@sveltejs/kit";

const modules = import.meta.glob("/src/lib/server/resources/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export async function load({ params }) {
  const data = server.parseData();
  const article = data[server.KEY_DATA_ARTICLES]
    .find((article) => article[server.KEY_DATA_ARTICLE_ID] === params.id);

  if (!article) {
    throw error(404);
  }

  const rendered = await render(
    modules[`/src/lib/server/resources/articles/${article[server.KEY_DATA_ARTICLE_CONTENT]}`],
  );

  const result = {
    ...renderArticle(article),
    [client.KEY_DATA_ARTICLE_DESCRIPTION]: article[server.KEY_DATA_ARTICLE_DESCRIPTION],
    [client.KEY_DATA_ARTICLE_CONTENT]: rendered.html,
    [client.KEY_DATA_ARTICLE_HEADINGS]: rendered.headings,
    [client.KEY_DATA_ARTICLE_FOOTNOTES]: rendered.footnotes,
  };

  return result;
}
