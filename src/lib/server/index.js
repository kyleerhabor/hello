import * as client from "$lib/server";
import { render } from "$lib/server/markdown";
import data from "$lib/server/resources/data.toml?raw";
import * as R from "ramda";
import toml from "smol-toml";

// Resources
export const KEY_RESOURCES = "resources";
export const KEY_RESOURCE_ID = "resource.id";
export const KEY_RESOURCE_VALUE = "resource.value";

// Mediums
export const KEY_MEDIUMS = "mediums";
export const KEY_MEDIUM_ID = "medium.id";
export const KEY_MEDIUM_VALUE = "medium.value";

// Titles
export const KEY_TITLES = "titles";
export const KEY_TITLE_ID = "title.id";
export const KEY_TITLE_NAME = "title.name";
export const KEY_TITLE_MEDIUM = "title.medium";

// Title links
export const KEY_TITLE_LINKS = "title.links";
export const KEY_TITLE_LINK_TITLE = "title.link.title";
export const KEY_TITLE_LINK_RESOURCE = "title.link.resource";
export const KEY_TITLE_LINK_RESOURCE_ANIDB_ANIME_ID = "title.link.resource.anidb-anime.id";
export const KEY_TITLE_LINK_RESOURCE_MANGAUPDATES_SERIES_ID = "title.link.resource.mangaupdates-series.id";
export const KEY_TITLE_LINK_RESOURCE_NOVELUPDATES_SERIES_SLUG = "title.link.resource.novelupdates-series.slug";
export const KEY_TITLE_LINK_RESOURCE_MYDRAMALIST_ID = "title.link.resource.mydramalist.id";

// Logs
export const KEY_LOGS = "logs";
export const KEY_LOG_TITLE = "log.title";
export const KEY_LOG_RATING = "log.rating";

// Articles
export const KEY_DATA_ARTICLES = "articles";
export const KEY_DATA_ARTICLE_ID = "article.id";

// Article revisions
export const KEY_DATA_ARTICLE_VERSIONS = "article.versions";
export const KEY_DATA_ARTICLE_VERSION_ARTICLE = "article.version.article";
export const KEY_DATA_ARTICLE_VERSION_NUMBER = "article.version.number";
export const KEY_DATA_ARTICLE_VERSION_TITLE = "article.version.title";
export const KEY_DATA_ARTICLE_VERSION_DATE = "article.version.date";
export const KEY_DATA_ARTICLE_VERSION_DESCRIPTION = "article.version.description";
export const KEY_DATA_ARTICLE_VERSION_CONTENT = "article.version.content";

export const articleModules = import.meta.glob("/src/lib/server/resources/writings/articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const parseData = R.once(() => toml.parse(data));
export const resource = R.curry((id, resources) => R.path([id, KEY_RESOURCE_VALUE], resources));
export const medium = R.curry((id, mediums) => R.path([id, KEY_MEDIUM_VALUE], mediums));

export function article(id, data) {
  const article = data[KEY_DATA_ARTICLES].find((article) => article[KEY_DATA_ARTICLE_ID] === id);

  if (!article) {
    throw error(404);
  }

  return article;
}

/**
 * @param {string} v
 * @param {any[]} versions
 * @returns {any}
 */
export function version(v, versions) {
  const vNo = parseInt(v, 10);

  if (isNaN(vNo)) {
    throw error(400);
  }

  const version = versions.find((version) => version[KEY_DATA_ARTICLE_VERSION_NUMBER] === vNo);

  if (version === undefined) {
    throw error(404);
  }

  return version;
}

export function renderArticle(article, version) {
  return {
    [client.KEY_DATA_ARTICLE_ID]: article[KEY_DATA_ARTICLE_ID],
    [client.KEY_DATA_ARTICLE_TITLE]: version[KEY_DATA_ARTICLE_VERSION_TITLE],
    [client.KEY_DATA_ARTICLE_DATE]: version[KEY_DATA_ARTICLE_VERSION_DATE],
  };
}

export async function renderArticleDetail(article, version, versions) {
  const rendered = await render(
    articleModules[`/src/lib/server/resources/writings/articles/${version[KEY_DATA_ARTICLE_VERSION_CONTENT]}`],
  );

  const result = {
    ...renderArticle(article, version),
    [client.KEY_DATA_ARTICLE_DESCRIPTION]: version[KEY_DATA_ARTICLE_VERSION_DESCRIPTION],
    [client.KEY_DATA_ARTICLE_CONTENT]: rendered.html,
    [client.KEY_DATA_ARTICLE_HEADINGS]: rendered.headings,
    [client.KEY_DATA_ARTICLE_FOOTNOTES]: rendered.footnotes,
    [client.KEY_DATA_ARTICLE_VERSION]: version[KEY_DATA_ARTICLE_VERSION_NUMBER],
    [client.KEY_DATA_ARTICLE_VERSIONS]: versions.map((version) => ({
      [client.KEY_DATA_ARTICLE_VERSION_NUMBER]: version[KEY_DATA_ARTICLE_VERSION_NUMBER],
      [client.KEY_DATA_ARTICLE_VERSION_DATE]: version[KEY_DATA_ARTICLE_VERSION_DATE],
    })),
  };

  return result;
}
