import { hash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dev } from "$app/environment";
import { key, unique } from "$lib/index";
import data from "$lib/assets/data.json";
import { getColor } from "colorthief";
import * as R from "ramda";
import sharp from "sharp";

export async function load() {
  const idProp = R.prop("id");
  const mediums = key(idProp, data.mediums);
  const titles = key(idProp, data.titles);
  const logs = unique((log) => log.titleID, data.logs.toReversed());
  const colors = await Promise.allSettled(logs.map(async (log) => {
    const id = log.titleID;
    const path = titles[id].coverImagePath;
    const baseDirectory = dev ? "../../../" : "../../../../../../";
    const url = new URL(`${baseDirectory}/${path}`, import.meta.url);
    const buffer = await readFile(url);
    const name = hash("sha256", buffer);
    const assetsDirectory = "assets";
    const assetsURL = new URL(`${baseDirectory}/${assetsDirectory}`, import.meta.url);
    const fileURL = new URL(`${baseDirectory}/${assetsDirectory}/${name}.webp`, import.meta.url);
    // ~125 KB
    const output = await sharp(buffer)
      .resize(300, 450)
      // TODO: Support many formats (JPEG XL, WebP, JPEG)
      .jpeg({ quality: 100 })
      // .webp({ lossless: true })
      .toBuffer();

    try {
      await writeFile(fileURL, output);
    } catch (e) {
      if (e.code != "ENOENT") {
        throw e;
      }

      await mkdir(assetsURL, { recursive: true });
      await writeFile(fileURL, output);
    }

    return {
      titleID: id,
      accentColor: await getColor(output),
      coverImageAssetsPath: `/assets/${name}.webp`,
    };
  }));

  colors.forEach((result) => {
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
