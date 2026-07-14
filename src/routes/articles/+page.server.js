import * as client from "$lib/server";
import * as server from "$lib/server/index";
import { renderArticle } from "$lib/server/markdown";

export function load() {
  const data = server.parseData();
  const result = {
    [client.KEY_DATA_ARTICLES]: data[server.KEY_ARTICLES]
      .map((article) => renderArticle(article))
      .toReversed(),
  };

  return result;
}
