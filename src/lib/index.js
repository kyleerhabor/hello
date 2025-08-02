import crypto from "node:crypto";
import fs from "node:fs/promises";
import v8 from "node:v8";
import * as R from "ramda";

// TODO: Don't access server config from client (i.e., map it).
export const KEY_SERVER_CONFIG_MEDIUMS = "server.config.mediums";
export const KEY_SERVER_CONFIG_MEDIUM_ID = "server.config.medium.id";
export const KEY_SERVER_CONFIG_MEDIUM_VALUE = "server.config.medium.value";
export const KEY_SERVER_CONFIG_TITLES = "server.config.titles";
export const KEY_SERVER_CONFIG_TITLE_ID = "server.config.title.id";
export const KEY_SERVER_CONFIG_TITLE_NAME = "server.config.title.name";
export const KEY_SERVER_CONFIG_TITLE_MEDIUM = "server.config.title.medium";
export const KEY_SERVER_CONFIG_TITLE_COVER_IMAGE = "server.config.title.coverImagePath";
export const KEY_SERVER_CONFIG_LOGS = "server.config.logs";
export const KEY_SERVER_CONFIG_LOG_TITLE = "server.config.log.title";
export const KEY_SERVER_CONFIG_LOG_RATING = "server.config.log.rating";
export const KEY_SERVER_PAGE_TITLE = "server.page.title";
export const KEY_SERVER_PAGE_TITLE_ACCENT_COLOR = "server.page.titleAccentColor";
export const KEY_SERVER_PAGE_TITLE_COVER_IMAGES = "server.page.titleCoverImages";
export const KEY_SERVER_PAGE_TITLE_COVER_IMAGE_PATH = "server.page.titleCoverImage.path";
export const KEY_SERVER_PAGE_TITLE_COVER_IMAGE_MIME_TYPE = "server.page.titleCoverImage.mimeType";

// TODO: Figure out why Svelte errors out from these two
// export const sha256b = R.curry(crypto.hash)("sha256", R.__, "buffer");
// It sucks that changing the serializer will change the SHA-256, but it's the built-in general-purpose serializer in Node.js.
// export const sha256 = R.pipe(v8.serialize, sha256b);

export function sha256b(buffer) {
  return crypto.hash("sha256", buffer, "buffer");
}

export function sha256(o) {
  return sha256b(v8.serialize(o));
}

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

export async function writeFile(directory, path, data) {
  try {
    await fs.writeFile(path, data);
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw e;
    }

    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path, data);
  }
}

export async function fileExists(path) {
  await resolves(fs.access(path));
}
