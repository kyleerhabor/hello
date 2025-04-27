import crypto from "node:crypto";
import fs from "node:fs/promises";
import v8 from "node:v8";
import * as R from "ramda";

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
  return coll.reduce((obj, element) => ({
    ...obj,
    [key(element)]: element,
  }), {});
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
