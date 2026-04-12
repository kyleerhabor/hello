export const KEY_DATA_MEDIUMS = "data.mediums";
export const KEY_DATA_MEDIUM_ID = "data.medium.id";
export const KEY_DATA_MEDIUM_VALUE = "data.medium.value";
export const DATA_MEDIUM_VALUE_FILM = 0;
export const DATA_MEDIUM_VALUE_ANIMATION = 1;
export const DATA_MEDIUM_VALUE_ANIME = 2;
export const DATA_MEDIUM_VALUE_DONGHUA = 3;
export const DATA_MEDIUM_VALUE_NOVEL = 4;
export const DATA_MEDIUM_VALUE_COMICS = 5;
export const DATA_MEDIUM_VALUE_MANGA = 6;
export const DATA_MEDIUM_VALUE_MANHUA = 7;
export const DATA_MEDIUM_VALUE_MANHWA = 8;
export const KEY_DATA_RESOURCES = "data.resources";
export const KEY_DATA_RESOURCE_ID = "data.resource.id";
export const KEY_DATA_RESOURCE_VALUE = "data.resource.value";
export const DATA_RESOURCE_VALUE_ANIDB = 0;
export const DATA_RESOURCE_VALUE_MANGAUPDATES = 1;
export const DATA_RESOURCE_VALUE_NOVELUPDATES = 2;
export const DATA_RESOURCE_VALUE_MYDRAMALIST = 3;
export const KEY_DATA_LOCALIZATIONS = "data.localizations";
export const KEY_DATA_LOCALIZATION_ID = "data.localization.id";
export const KEY_DATA_LOCALIZATION_MESSAGES = "data.localization.messages";
export const KEY_DATA_LOCALIZATION_MESSAGE_LOCALIZATION = "data.localization.message.localization";
export const KEY_DATA_LOCALIZATION_MESSAGE_LOCALE = "data.localization.message.locale";
export const KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE = "data.localization.message.message";
export const KEY_DATA_TITLES = "data.titles";
export const KEY_DATA_TITLE_ID = "data.title.id";
export const KEY_DATA_TITLE_NAME = "data.title.name";
export const KEY_DATA_TITLE_MEDIUM = "data.title.medium";
export const KEY_DATA_TITLE_LINKS = "data.title.links";
export const KEY_DATA_TITLE_LINK_TITLE = "data.title.link.title";
export const KEY_DATA_TITLE_LINK_RESOURCE = "data.title.link.resource";
export const KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ID = "data.title.link.resource.anidb.id";
export const KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID = "data.title.link.resource.mangaupdates.id";
export const KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG = "data.title.link.resource.novelupdates.slug";
export const KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID = "data.title.link.resource.mydramalist.id";
export const KEY_DATA_LOGS = "data.logs";
export const KEY_DATA_LOG_TITLE = "data.log.title";
export const KEY_DATA_LOG_RATING = "data.log.rating";

export function isZero(x) {
  return x === 0;
}

export function isEven(x) {
  return isZero(x % 2);
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

