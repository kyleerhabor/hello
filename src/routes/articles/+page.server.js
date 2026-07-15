import * as client from "$lib/server";
import * as server from "$lib/server/index";

export function load() {
  const data = server.parseData();
  const result = {
    [client.KEY_DATA_ARTICLES]: data[server.KEY_DATA_ARTICLES]
      .map((article) => {
        const versions = data[server.KEY_DATA_ARTICLE_VERSIONS]
          .filter((version) => version[server.KEY_DATA_ARTICLE_VERSION_ARTICLE] === article[server.KEY_DATA_ARTICLE_ID])

        const version = versions[versions.length - 1];
        const rendered = server.renderArticle(article, version);

        return rendered;
      })
      .toReversed(),
  };

  return result;
}
