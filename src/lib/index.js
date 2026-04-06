export const KEY_SERVER_CONFIG_MEDIUMS = "server.config.mediums";
export const KEY_SERVER_CONFIG_MEDIUM_ID = "server.config.medium.id";
export const KEY_SERVER_CONFIG_MEDIUM_VALUE = "server.config.medium.value";
export const KEY_SERVER_CONFIG_RESOURCES = "server.config.resources";
export const KEY_SERVER_CONFIG_RESOURCE_ID = "server.config.resource.id";
export const KEY_SERVER_CONFIG_RESOURCE_VALUE = "server.config.resource.value";
export const KEY_SERVER_CONFIG_TITLES = "server.config.titles";
export const KEY_SERVER_CONFIG_TITLE_ID = "server.config.title.id";
export const KEY_SERVER_CONFIG_TITLE_NAME = "server.config.title.name";
export const KEY_SERVER_CONFIG_TITLE_MEDIUM = "server.config.title.medium";
export const KEY_SERVER_CONFIG_LINKS = "server.config.links";
export const KEY_SERVER_CONFIG_LINK_TITLE = "server.config.link.title";
export const KEY_SERVER_CONFIG_LINK_RESOURCE = "server.config.link.resource";
export const KEY_SERVER_CONFIG_LINK_RESOURCE_ANIDB_ID = "server.config.link.resource.anidb.id";
export const KEY_SERVER_CONFIG_LINK_RESOURCE_MANGAUPDATES_ID = "server.config.link.resource.mangaupdates.id";
export const KEY_SERVER_CONFIG_LINK_RESOURCE_NOVELUPDATES_SLUG = "server.config.link.resource.novelupdates.slug";
export const KEY_SERVER_CONFIG_LINK_RESOURCE_MYDRAMALIST_ID = "server.config.link.resource.mydramalist.id";
export const KEY_SERVER_CONFIG_LOGS = "server.config.logs";
export const KEY_SERVER_CONFIG_LOG_TITLE = "server.config.log.title";
export const KEY_SERVER_CONFIG_LOG_RATING = "server.config.log.rating";
export const KEY_SERVER_PAGE_SERIES_MEDIUMS = "server.page.series.mediums";
export const KEY_SERVER_PAGE_SERIES_RESOURCES = "server.page.series.resources";
export const KEY_SERVER_PAGE_SERIES_TITLES = "server.page.series.titles";
export const KEY_SERVER_PAGE_SERIES_LOGS = "server.page.series.logs";
export const KEY_SERVER_DATA_MEDIUM_ID = "server.data.medium.id";
export const KEY_SERVER_DATA_MEDIUM_VALUE = "server.data.medium.value";
export const SERVER_DATA_MEDIUM_VALUE_FILM = 0;
export const SERVER_DATA_MEDIUM_VALUE_ANIMATION = 1;
export const SERVER_DATA_MEDIUM_VALUE_ANIME = 2;
export const SERVER_DATA_MEDIUM_VALUE_DONGHUA = 3;
export const SERVER_DATA_MEDIUM_VALUE_NOVEL = 4;
export const SERVER_DATA_MEDIUM_VALUE_COMICS = 5;
export const SERVER_DATA_MEDIUM_VALUE_MANGA = 6;
export const SERVER_DATA_MEDIUM_VALUE_MANHUA = 7;
export const SERVER_DATA_MEDIUM_VALUE_MANHWA = 8;
export const KEY_SERVER_DATA_RESOURCE_ID = "server.data.resource.id";
export const KEY_SERVER_DATA_RESOURCE_VALUE = "server.data.resource.value";
export const SERVER_DATA_RESOURCE_VALUE_ANIDB = 0;
export const SERVER_DATA_RESOURCE_VALUE_MANGAUPDATES = 1;
export const SERVER_DATA_RESOURCE_VALUE_NOVELUPDATES = 2;
export const SERVER_DATA_RESOURCE_VALUE_MYDRAMALIST = 3;
export const KEY_SERVER_DATA_TITLE_ID = "server.data.title.id";
export const KEY_SERVER_DATA_TITLE_NAME = "server.data.title.name";
export const KEY_SERVER_DATA_TITLE_MEDIUM = "server.data.title.medium";
export const KEY_SERVER_DATA_TITLE_LINKS = "server.data.title.links";
export const KEY_SERVER_DATA_TITLE_LINK_RESOURCE = "server.data.title.resource";
export const KEY_SERVER_DATA_TITLE_LINK_RESOURCE_ANIDB_ID = "server.data.title.resource.anidb.id";
export const KEY_SERVER_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID = "server.data.title.resource.mangaupdates.id";
export const KEY_SERVER_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG = "server.data.title.resource.novelupdates.slug";
export const KEY_SERVER_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID = "server.data.title.resource.mydramalist.id";
export const KEY_SERVER_DATA_LOG_TITLE = "server.data.log.title";
export const KEY_SERVER_DATA_LOG_RATING = "server.data.log.rating";

async function resolves(p) {
  try {
    await p;

    return true;
  } catch {
    return false;
  }
}

export function isZero(n) {
  return n === 0;
}

export function isEven(n) {
  return isZero(n % 2);
}

export function isLocalURL(url, base) {
  return new URL(url, base).origin === base;
}

export function key(key, coll) {
  return coll.reduce((obj, element) => ({ ...obj, [key(element)]: element }), {});
}

export function unique(key, coll) {
  const result = coll.reduce((obj, element) => {
    const s = key(element);

    if (obj.set.has(s)) {
      return obj;
    }

    obj.set.add(s);
    obj.items.push(element);

    return obj;
  }, {
    items: [],
    set: new Set(),
  });

  return result.items;
}