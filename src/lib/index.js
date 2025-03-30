import crypto from "node:crypto";
import fs from "node:fs/promises";
import v8 from "node:v8";

// place files you want to import through the `$lib` alias in this folder.
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
  try {
    await fs.access(path);

    return true;
  } catch {
    return false;
  }
}

export function copy(value) {
  return v8.deserialize(v8.serialize(value));
}

export function sha256(o) {
  return crypto.hash("sha256", v8.serialize(o));
}
