import { read } from "$app/server";
import { key, unique } from "$lib/index";
import data from "$lib/assets/data.json";

export async function load() {
  const mediums = key((medium) => medium.id, data.mediums);
  const titles = key((title) => title.id, data.titles);
  const logs = unique((log) => log.titleID, data.logs.toReversed());

  return {
    mediums,
    titles,
    logs,
  };
}
