import * as lib from "$lib";
import data from "$lib/config.toml?raw";
import { once, prop } from "ramda";
import toml from "smol-toml";
import * as series from "../series";

const parseData = once(data => toml.parse(data));

function logTitle(titles, log) {
  return titles[log[lib.KEY_DATA_LOG_TITLE]];
}

function titleMedium(mediums, title) {
  return mediums[title[lib.KEY_DATA_TITLE_MEDIUM]];
}

/** @type {import('./$types').PageServerLoad]} */
export function load() {
  const d = parseData(data);
  const mediums = lib.key(
    prop(series.KEY_DATA_MEDIUM_ID),
    d[lib.KEY_DATA_MEDIUMS].map((medium) => ({
      [series.KEY_DATA_MEDIUM_ID]: medium[lib.KEY_DATA_MEDIUM_ID],
      [series.KEY_DATA_MEDIUM_VALUE]: medium[lib.KEY_DATA_MEDIUM_VALUE],
    })),
  );

  const titles = lib.key(
    prop(series.KEY_DATA_TITLE_ID),
    d[lib.KEY_DATA_TITLES].map((title) => {
      const id = title[lib.KEY_DATA_TITLE_ID];

      return {
        [series.KEY_DATA_TITLE_ID]: id,
        [series.KEY_DATA_TITLE_NAME]: title[lib.KEY_DATA_TITLE_NAME],
        [series.KEY_DATA_TITLE_MEDIUM]: title[lib.KEY_DATA_TITLE_MEDIUM],
        [series.KEY_DATA_TITLE_LINKS]: d[lib.KEY_DATA_LINKS]
          .filter((link) => link[lib.KEY_DATA_LINK_TITLE] == id)
          .map((link, i) => ({
            [series.KEY_DATA_TITLE_LINK_ID]: i,
            [series.KEY_DATA_TITLE_LINK_RESOURCE]: link[lib.KEY_DATA_LINK_RESOURCE],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ID]: link[lib.KEY_DATA_LINK_RESOURCE_ANIDB_ID],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID]: link[lib.KEY_DATA_LINK_RESOURCE_MANGAUPDATES_ID],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG]: link[lib.KEY_DATA_LINK_RESOURCE_NOVELUPDATES_SLUG],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID]: link[lib.KEY_DATA_LINK_RESOURCE_MYDRAMALIST_ID],
          })),
      };
    }),
  );

  return {
    [series.KEY_PAGE_SERIES_MEDIUMS]: mediums,
    [series.KEY_PAGE_SERIES_RESOURCES]: lib.key(
      prop(series.KEY_DATA_RESOURCE_ID),
      d[lib.KEY_DATA_RESOURCES].map((resource) => ({
        [series.KEY_DATA_RESOURCE_ID]: resource[lib.KEY_DATA_RESOURCE_ID],
        [series.KEY_DATA_RESOURCE_VALUE]: resource[lib.KEY_DATA_RESOURCE_VALUE],
      })),
    ),
    [series.KEY_PAGE_SERIES_TITLES]: titles,
    [series.KEY_PAGE_SERIES_LOGS]: lib.unique(prop(lib.KEY_DATA_LOG_TITLE), d[lib.KEY_DATA_LOGS].toReversed())
      .sort((a, b) =>
        b[lib.KEY_DATA_LOG_RATING] - a[lib.KEY_DATA_LOG_RATING]
        || logTitle(titles, a)[lib.KEY_DATA_TITLE_NAME].localeCompare(logTitle(titles, b)[lib.KEY_DATA_TITLE_NAME])
        // eslint-disable-next-line @stylistic/comma-dangle
        || titleMedium(mediums, logTitle(titles, a))[lib.KEY_DATA_MEDIUM_VALUE] - titleMedium(mediums, logTitle(titles, b))[lib.KEY_DATA_MEDIUM_VALUE]
      )
      .map((log, i) => ({
        [series.KEY_DATA_LOG_ID]: i,
        [series.KEY_DATA_LOG_TITLE]: log[lib.KEY_DATA_LOG_TITLE],
        [series.KEY_DATA_LOG_RATING]: log[lib.KEY_DATA_LOG_RATING],
      })),
  };
}

