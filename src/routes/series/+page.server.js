import fs from "node:fs/promises";
import { dirname } from "node:path";
import * as v8 from "node:v8";
import { fileExists, key, sha256, sha256b, unique, writeFile } from "$lib/index";
import data from "$lib/assets/data.toml?raw";
import { getColor } from "colorthief";
import { findUp } from "find-up";
import { parse } from "smol-toml";
import * as R from "ramda";
import sharp from "sharp";

function path(directory, buffer, extension) {
  return `${directory}/${buffer.toString("hex")}.${extension}`;
}

async function writeImage(sharp, directory, extension, data) {
  if (data && await fileExists(path(directory, data.hash, extension))) {
    return data;
  }

  const buffer = await sharp.toBuffer();
  const hash = sha256b(buffer).subarray(0, 8);
  await writeFile(directory, path(directory, hash, extension), buffer);

  return { hash };
}

async function writeImageAsset(sharp, directory, extension, mimeType, data, key) {
  const d = await writeImage(sharp, directory, extension, data[key]);
  data[key] = d;

  return {
    path: path("assets", d.hash, extension),
    mimeType: mimeType,
  };
}

/** @type {import('./$types').PageServerLoad]} */
export async function load(event) {
  const d = parse(data);
  const idProp = R.prop("id");
  const titleIdProp = R.prop("titleID");
  const mediums = key(idProp, d.mediums);
  const titles = key(idProp, d.titles);
  const logs = unique(titleIdProp, d.logs.toReversed())
    .sort((a, b) => b.rating - a.rating || titles[a.titleID].name.localeCompare(titles[b.titleID].name));

  const projectDirectory = dirname(await findUp("package.json"));
  const dataFile = `${projectDirectory}/data`;
  let dt;

  try {
    dt = v8.deserialize(await fs.readFile(dataFile));
  } catch (e) {
    dt = {};
  }

  const directory = `${projectDirectory}/static/assets`;
  const width = 200;
  const height = width * (3 / 2);
  const results = await Promise.allSettled(logs.map(async (log) => {
    const id = titleIdProp(log);
    const title = titles[id];
    const buffer = await fs.readFile(`${projectDirectory}/${title.coverImagePath}`);
    const s = sharp(buffer).resize(width, height);
    const output = await s.toBuffer();

    return {
      titleID: id,
      accentColor: await getColor(output),
      coverImageAssets: await Promise.all([
        // TODO: Support JPEG XL
        // writeImageAsset(s.clone().jxl({ lossless: true }), directory, "jxl", "image/jxl", dt, sha256({
        //   buffer,
        //   format: "jxl",
        //   version: 0,
        // })),
        writeImageAsset(s.clone().webp({ lossless: true }), directory, "webp", "image/webp", dt, sha256({
          buffer,
          format: "webp",
          version: 0,
        })),
        writeImageAsset(s.clone().jpeg({ quality: 100 }), directory, "jpeg", "image/jpeg", dt, sha256({
          buffer,
          format: "jpeg",
          version: 0,
        })),
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

  await fs.writeFile(dataFile, v8.serialize(dt));

  return {
    mediums,
    titles,
    logs,
  };
}
