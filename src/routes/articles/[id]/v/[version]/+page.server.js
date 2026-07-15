import * as server from "$lib/server/index";

/** @type {import("./$types").PageServerLoad} */
export async function load({ params, url }) {
  const data = server.parseData();
  const article = server.article(params.id, data);
  const versions = data[server.KEY_DATA_ARTICLE_VERSIONS]
    .filter((version) => version[server.KEY_DATA_ARTICLE_VERSION_ARTICLE] === article[server.KEY_DATA_ARTICLE_ID]);

  const version = server.version(params.version, versions);
  const rendered = await server.renderArticleDetail(article, version, versions);

  return rendered;
}
