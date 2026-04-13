import * as lib from "$lib";
import data from "$lib/config.toml?raw";
import { once, prop } from "ramda";
import toml from "smol-toml";
import * as series from "../series";
import { getLocale } from "$lib/paraglide/runtime";

const parseData = once(data => toml.parse(data));

function logTitle(titles, log) {
  return titles[log[series.KEY_DATA_LOG_TITLE]];
}

function titleName(localizations, title) {
  return localizations[title[series.KEY_DATA_TITLE_NAME]];
}

function titleMedium(mediums, title) {
  return mediums[title[series.KEY_DATA_TITLE_MEDIUM]];
}

function localizationMessage(localization, locale) {
  return localization[series.KEY_DATA_LOCALIZATION_MESSAGES][locale][series.KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE];
}

/** @type {import('./$types').PageServerLoad]} */
export function load() {
  const locale = getLocale();
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
      const result = {
        [series.KEY_DATA_TITLE_ID]: id,
        [series.KEY_DATA_TITLE_NAME]: title[lib.KEY_DATA_TITLE_NAME],
        [series.KEY_DATA_TITLE_MEDIUM]: title[lib.KEY_DATA_TITLE_MEDIUM],
        [series.KEY_DATA_TITLE_LINKS]: d[lib.KEY_DATA_TITLE_LINKS]
          .filter((link) => link[lib.KEY_DATA_TITLE_LINK_TITLE] == id)
          .map((link, i) => ({
            [series.KEY_DATA_TITLE_LINK_ID]: i,
            [series.KEY_DATA_TITLE_LINK_RESOURCE]: link[lib.KEY_DATA_TITLE_LINK_RESOURCE],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ID]: link[lib.KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ID],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID]: link[lib.KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG]: link[lib.KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG],
            [series.KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID]: link[lib.KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID],
          })),
      };

      return result;
    }),
  );

  const localizations = lib.key(
    prop(series.KEY_DATA_LOCALIZATION_ID),
    d[lib.KEY_DATA_LOCALIZATIONS].map((localization) => {
      const id = localization[lib.KEY_DATA_LOCALIZATION_ID];
      const result = {
        [series.KEY_DATA_LOCALIZATION_ID]: id,
        [series.KEY_DATA_LOCALIZATION_MESSAGES]: lib.key(
          prop(series.KEY_DATA_LOCALIZATION_MESSAGE_LOCALE),
          d[lib.KEY_DATA_LOCALIZATION_MESSAGES]
            .filter((message) => message[lib.KEY_DATA_LOCALIZATION_MESSAGE_LOCALIZATION] == id)
            .map((message) => ({
              [series.KEY_DATA_LOCALIZATION_MESSAGE_LOCALE]: message[lib.KEY_DATA_LOCALIZATION_MESSAGE_LOCALE],
              [series.KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE]: message[lib.KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE],
            })),
        ),
      };

      return result;
    }),
  );
  
  const result = {
    [series.KEY_PAGE_SERIES_MEDIUMS]: mediums,
    [series.KEY_PAGE_SERIES_RESOURCES]: lib.key(
      prop(series.KEY_DATA_RESOURCE_ID),
      d[lib.KEY_DATA_RESOURCES].map((resource) => ({
        [series.KEY_DATA_RESOURCE_ID]: resource[lib.KEY_DATA_RESOURCE_ID],
        [series.KEY_DATA_RESOURCE_VALUE]: resource[lib.KEY_DATA_RESOURCE_VALUE],
      })),
    ),
    [series.KEY_PAGE_SERIES_LOCALIZATIONS]: localizations,
    [series.KEY_PAGE_SERIES_TITLES]: titles,
    [series.KEY_PAGE_SERIES_LOGS]: lib.unique(prop(lib.KEY_DATA_LOG_TITLE), d[lib.KEY_DATA_LOGS].toReversed())
      .map((log, i) => ({
        [series.KEY_DATA_LOG_ID]: i,
        [series.KEY_DATA_LOG_TITLE]: log[lib.KEY_DATA_LOG_TITLE],
        [series.KEY_DATA_LOG_RATING]: log[lib.KEY_DATA_LOG_RATING],
      }))
      .sort((a, b) => b[lib.KEY_DATA_LOG_RATING] - a[lib.KEY_DATA_LOG_RATING]
        || localizationMessage(titleName(localizations, logTitle(titles, a)), locale).localeCompare(localizationMessage(titleName(localizations, logTitle(titles, b)), locale))
        // eslint-disable-next-line @stylistic/comma-dangle
        || titleMedium(mediums, logTitle(titles, a))[lib.KEY_DATA_MEDIUM_VALUE] - titleMedium(mediums, logTitle(titles, b))[lib.KEY_DATA_MEDIUM_VALUE]
      ),
  };

  return result;
}