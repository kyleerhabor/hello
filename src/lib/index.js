// TODO: Don't access server config from client (i.e., map it).
export const KEY_SERVER_CONFIG_MEDIUMS = "server.config.mediums";
export const KEY_SERVER_CONFIG_MEDIUM_ID = "server.config.medium.id";
export const KEY_SERVER_CONFIG_MEDIUM_VALUE = "server.config.medium.value";
export const KEY_SERVER_CONFIG_TITLES = "server.config.titles";
export const KEY_SERVER_CONFIG_TITLE_ID = "server.config.title.id";
export const KEY_SERVER_CONFIG_TITLE_NAME = "server.config.title.name";
export const KEY_SERVER_CONFIG_TITLE_MEDIUM = "server.config.title.medium";
export const KEY_SERVER_CONFIG_LOGS = "server.config.logs";
export const KEY_SERVER_CONFIG_LOG_TITLE = "server.config.log.title";
export const KEY_SERVER_CONFIG_LOG_RATING = "server.config.log.rating";

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