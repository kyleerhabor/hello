import { dev } from "$app/environment";
import { key, unique } from "$lib/index";
import data from "$lib/assets/data.json";
import { getColor } from "colorthief";
import * as R from "ramda";

export async function load() {
  const idProp = R.prop("id");
  const mediums = key(idProp, data.mediums);
  const titles = key(idProp, data.titles);
  const logs = unique((log) => log.titleID, data.logs.toReversed());
  const colors = await Promise.allSettled(R.map(async (log) => {
    const id = log.titleID;
    const root = dev ? "../../../static" : "../../../../client";
    const path = titles[id].coverImagePath;

    return {
      titleID: id,
      accentColor: await getColor(new URL(`${root}/${path}`, import.meta.url).pathname),
    };
  }, logs));

  colors.forEach((result) => {
    if (result.status != "fulfilled") {
      return;
    }

    const value = result.value;
    titles[value.titleID].accentColor = value.accentColor;
  });

  return {
    mediums,
    titles,
    logs,
  };
}
