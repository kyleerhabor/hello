import fs from "node:fs/promises";
import { dirname } from "node:path";
import * as v8 from "node:v8";
import {
  fileExists,
  key,
  sha256,
  sha256b,
  unique,
  writeFile,
  KEY_SERVER_CONFIG_MEDIUMS,
  KEY_SERVER_CONFIG_MEDIUM_ID,
  KEY_SERVER_CONFIG_TITLES,
  KEY_SERVER_CONFIG_TITLE_ID,
  KEY_SERVER_CONFIG_TITLE_NAME,
  KEY_SERVER_CONFIG_TITLE_MEDIUM,
  KEY_SERVER_CONFIG_TITLE_COVER_IMAGE,
  KEY_SERVER_CONFIG_LOGS,
  KEY_SERVER_CONFIG_LOG_TITLE,
  KEY_SERVER_CONFIG_LOG_RATING,
  KEY_SERVER_PAGE_TITLE,
  KEY_SERVER_PAGE_TITLE_ACCENT_COLOR,
  KEY_SERVER_PAGE_TITLE_COVER_IMAGES,
  KEY_SERVER_PAGE_TITLE_COVER_IMAGE_PATH,
  KEY_SERVER_PAGE_TITLE_COVER_IMAGE_MIME_TYPE,
} from "$lib/index";
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
    [KEY_SERVER_PAGE_TITLE_COVER_IMAGE_PATH]: path("assets", d.hash, extension),
    [KEY_SERVER_PAGE_TITLE_COVER_IMAGE_MIME_TYPE]: mimeType,
  };
}

function logTitleName(titles, log) {
  return titles[log[KEY_SERVER_CONFIG_LOG_TITLE]][KEY_SERVER_CONFIG_TITLE_NAME];
}

/** @type {import('./$types').PageServerLoad]} */
export async function load(event) {
  const d = parse(data);
  const mediums = key(R.prop(KEY_SERVER_CONFIG_MEDIUM_ID), d[KEY_SERVER_CONFIG_MEDIUMS]);
  const titles = key(R.prop(KEY_SERVER_CONFIG_TITLE_ID), d[KEY_SERVER_CONFIG_TITLES]);
  const logs = unique(R.prop(KEY_SERVER_CONFIG_LOG_TITLE), d[KEY_SERVER_CONFIG_LOGS].toReversed())
    .sort((a, b) => b[KEY_SERVER_CONFIG_LOG_RATING] - a[KEY_SERVER_CONFIG_LOG_RATING] || logTitleName(titles, a).localeCompare(logTitleName(titles, b)));

  const projectDirectory = dirname(await findUp("package.json"));
  const dataFile = `${projectDirectory}/data`;
  let dat;

  try {
    dat = v8.deserialize(await fs.readFile(dataFile));
  } catch (e) {
    console.error(e);

    dat = {};
  }

  const directory = `${projectDirectory}/static/assets`;
  const width = 200;
  const height = width * (3 / 2);
  const results = await Promise.allSettled(logs.map(async (log) => {
    const id = log[KEY_SERVER_CONFIG_LOG_TITLE];
    const title = titles[id];
    const buffer = await fs.readFile(`${projectDirectory}/${title[KEY_SERVER_CONFIG_TITLE_COVER_IMAGE]}`);
    const s = sharp(buffer).resize(width, height);
    const output = await s.toBuffer();

    return {
      [KEY_SERVER_PAGE_TITLE]: id,
      [KEY_SERVER_PAGE_TITLE_ACCENT_COLOR]: await getColor(output),
      [KEY_SERVER_PAGE_TITLE_COVER_IMAGES]: await Promise.all([
        writeImageAsset(s.clone().webp({ lossless: true }), directory, "webp", "image/webp", dat, sha256({
          buffer,
          format: "webp",
          version: 0,
        })),
        writeImageAsset(s.clone().jpeg({ quality: 100 }), directory, "jpeg", "image/jpeg", dat, sha256({
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
    Object.assign(titles[value[KEY_SERVER_PAGE_TITLE]], value);
  });

  await fs.writeFile(dataFile, v8.serialize(dat));

  return {
    mediums,
    titles,
    logs,
  };
}
