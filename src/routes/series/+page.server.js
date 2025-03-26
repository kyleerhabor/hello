import { hash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { key, unique } from "$lib/index";
import data from "$lib/assets/data.json";
import { getColor } from "colorthief";
import { findUp } from "find-up";
import * as R from "ramda";
import sharp from "sharp";
import { dirname } from "node:path";

/** @type {import('./$types').PageServerLoad]} */
export async function load(event) {
  const idProp = R.prop("id");
  const titleIdProp = R.prop("titleID");
  const mediums = key(idProp, data.mediums);
  const titles = key(idProp, data.titles);
  const logs = unique(titleIdProp, data.logs.toReversed());
  const projectDirectory = dirname(await findUp("package.json"));
  const staticDirectory = `${projectDirectory}/static`;
  const assetsDirectoryName = "assets";
  const results = await Promise.allSettled(logs.map(async (log) => {
    const id = titleIdProp(log);
    const title = titles[id];
    const buffer = await readFile(`${title.coverImagePath}`);
    const name = hash("sha256", buffer);
    const path = `${assetsDirectoryName}/${name}.jpeg`;
    const filePath = `${staticDirectory}/${path}`;
    // ~125 KB
    // TODO: Support many formats (JPEG XL, WebP, JPEG)
    const output = await sharp(buffer)
      .resize(300, 450)
      .jpeg({ quality: 100 })
      // .webp({ lossless: true })
      .toBuffer();

    try {
      await writeFile(filePath, output);
    } catch (e) {
      if (e.code != "ENOENT") {
        throw e;
      }

      await mkdir(`${staticDirectory}/${assetsDirectoryName}`, { recursive: true });
      await writeFile(filePath, output);
    }

    return {
      titleID: id,
      accentColor: await getColor(output),
      coverImageAssetsPath: path,
    };
  }));

  results.forEach((result) => {
    if (result.status != "fulfilled") {
      // TODO: Add proper logging.
      console.error(result.reason);

      return;
    }

    const value = result.value;
    titles[value.titleID].accentColor = value.accentColor;
    titles[value.titleID].coverImageAssetsPath = value.coverImageAssetsPath;
  });

  return {
    mediums,
    titles,
    logs,
  };
}
