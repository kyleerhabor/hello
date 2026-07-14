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

// Title Links
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
export const KEY_ARTICLES = "articles";
export const KEY_ARTICLE_ID = "article.id";
export const KEY_ARTICLE_TITLE = "article.title";
export const KEY_ARTICLE_DATE = "article.date";
export const KEY_ARTICLE_DESCRIPTION = "article.description";
export const KEY_ARTICLE_CONTENT = "article.content";

export const parseData = R.once(() => toml.parse(data));
export const resource = R.curry((id, resources) => R.path([id, KEY_RESOURCE_VALUE], resources));
export const medium = R.curry((id, mediums) => R.path([id, KEY_MEDIUM_VALUE], mediums));
