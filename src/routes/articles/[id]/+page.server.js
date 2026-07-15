import * as client from "$lib/server";
import * as server from "$lib/server/index";
import { render, renderArticle } from "$lib/server/markdown";
import { error } from "@sveltejs/kit";

const modules = import.meta.glob("/src/lib/server/resources/writings/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function getVersion(url, versions) {
  const v = url.searchParams.get("v");

  if (v === null) {
    return versions.at(-1);
  }

  const vNo = parseInt(v, 10);

  if (isNaN(vNo)) {
    throw error(400);
  }

  const version = versions.find((version) => version[server.KEY_DATA_ARTICLE_VERSION_NUMBER] === vNo);

  if (version === undefined) {
    throw error(404);
  }

  return version;
}

/** @type {import("./$types").PageServerLoad} */
export async function load({ params, url }) {
  const data = server.parseData();
  const article = data[server.KEY_DATA_ARTICLES]
    .find((article) => article[server.KEY_DATA_ARTICLE_ID] === params.id);

  if (!article) {
    throw error(404);
  }

  const versions = data[server.KEY_DATA_ARTICLE_VERSIONS]
    .filter((version) => version[server.KEY_DATA_ARTICLE_VERSION_ARTICLE] === article[server.KEY_DATA_ARTICLE_ID]);

  const version = getVersion(url, versions);
  const rendered = await render(
    modules[`/src/lib/server/resources/writings/articles/${version[server.KEY_DATA_ARTICLE_VERSION_CONTENT]}`],
  );

  const result = {
    ...renderArticle(article, version),
    [client.KEY_DATA_ARTICLE_DESCRIPTION]: version[server.KEY_DATA_ARTICLE_VERSION_DESCRIPTION],
    [client.KEY_DATA_ARTICLE_CONTENT]: rendered.html,
    [client.KEY_DATA_ARTICLE_HEADINGS]: rendered.headings,
    [client.KEY_DATA_ARTICLE_FOOTNOTES]: rendered.footnotes,
    [client.KEY_DATA_ARTICLE_VERSION]: version[server.KEY_DATA_ARTICLE_VERSION_NUMBER],
    [client.KEY_DATA_ARTICLE_VERSIONS]: versions.map((version) => ({
      [client.KEY_DATA_ARTICLE_VERSION_NUMBER]: version[server.KEY_DATA_ARTICLE_VERSION_NUMBER],
      [client.KEY_DATA_ARTICLE_VERSION_DATE]: version[server.KEY_DATA_ARTICLE_VERSION_DATE],
    })),
  };

  return result;
}
