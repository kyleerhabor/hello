import { hash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { key, unique } from "$lib/index";
import data from "$lib/assets/data.json";
import { getColor } from "colorthief";
import { findUp } from "find-up";
import * as R from "ramda";
import sharp from "sharp";
import { dirname } from "node:path";

async function writeImage(sharp, directory, extension) {
  const buffer = await sharp.toBuffer();
  // TODO: Generate a shorter hash.
  const sha = hash("sha256", buffer);
  const path = `${directory}/${sha}.${extension}`;

  try {
    await writeFile(path, buffer);
  } catch (e) {
    if (e.code != "ENOENT") {
      throw e;
    }

    await mkdir(directory, { recursive: true });
    await writeFile(path, buffer);
  }

  return sha;
}

async function writeImageAsset(sharp, directory, extension, mimeType) {
  const hash = await writeImage(sharp, directory, extension);

  return {
    path: `assets/${hash}.${extension}`,
    mimeType: mimeType,
  };
}

/** @type {import('./$types').PageServerLoad]} */
export async function load(event) {
  const d = JSON.parse(JSON.stringify(data));
  const idProp = R.prop("id");
  const titleIdProp = R.prop("titleID");
  const mediums = key(idProp, d.mediums);
  const titles = key(idProp, d.titles);
  const logs = unique(titleIdProp, d.logs.toReversed());
  const projectDirectory = dirname(await findUp("package.json"));
  const directory = `${projectDirectory}/static/assets`;
  const results = await Promise.allSettled(logs.map(async (log) => {
    const id = titleIdProp(log);
    const title = titles[id];
    const buffer = await readFile(`${title.coverImagePath}`);
    const s = sharp(buffer).resize(300, 450);
    const output = await s.toBuffer();

    return {
      titleID: id,
      accentColor: await getColor(output),
      coverImageAssets: await Promise.all([
        // TODO: Support JPEG XL
        writeImageAsset(s.webp({ lossless: true }), directory, "webp", "image/webp"),
        writeImageAsset(s.jpeg({ quality: 100 }), directory, "jpeg", "image/jpeg"),
      ]),
    };
  }));

  results.forEach((result) => {
    if (result.status != "fulfilled") {
      // TODO: Add proper logging.
      console.error(result.reason);

      return;
    }

    const value = result.value;
    Object.assign(titles[value.titleID], value);
  });

  return {
    mediums,
    titles,
    logs,
  };
}
