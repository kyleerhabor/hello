import { getLocale } from "$lib/paraglide/runtime";
import * as client from "$lib/server";
import * as server from "$lib/server/index";
import * as R from "ramda";

/** @type {import('./$types').PageServerLoad]} */
export function load() {
  const locale = getLocale();
  const data = server.parseConfig();
  const resources = R.indexBy(R.prop(server.KEY_DATA_RESOURCE_ID), data[server.KEY_DATA_RESOURCES]);
  const mediums = R.indexBy(R.prop(server.KEY_DATA_MEDIUM_ID), data[server.KEY_DATA_MEDIUMS]);  
  const result = {
    [client.KEY_DATA_LOCALIZATIONS]: R.indexBy(
      R.prop(client.KEY_DATA_LOCALIZATION_ID),
      data[server.KEY_DATA_LOCALIZATIONS].map((localization) => {
        const id = localization[server.KEY_DATA_LOCALIZATION_ID];
        const result = {
          [client.KEY_DATA_LOCALIZATION_ID]: id,
          [client.KEY_DATA_LOCALIZATION_MESSAGES]: R.indexBy(
            R.prop(client.KEY_DATA_LOCALIZATION_MESSAGE_LOCALE),
            data[server.KEY_DATA_LOCALIZATION_MESSAGES]
              .filter((message) => message[server.KEY_DATA_LOCALIZATION_MESSAGE_LOCALIZATION] == id)
              .map((message, i) => ({
                [client.KEY_DATA_LOCALIZATION_MESSAGE_ID]: i,
                [client.KEY_DATA_LOCALIZATION_MESSAGE_LOCALE]: message[server.KEY_DATA_LOCALIZATION_MESSAGE_LOCALE],
                [client.KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE]: message[server.KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE],
              })),
          ),
        };

        return result;
      }),
    ),
    [client.KEY_DATA_TITLES]: R.indexBy(
      R.prop(client.KEY_DATA_TITLE_ID),
      data[server.KEY_DATA_TITLES].map((title) => {
        let id = title[server.KEY_DATA_TITLE_ID];
        let result = {
          [client.KEY_DATA_TITLE_ID]: id,
          [client.KEY_DATA_TITLE_NAME]: title[server.KEY_DATA_TITLE_NAME],
          [client.KEY_DATA_TITLE_MEDIUM]: server.medium(title[server.KEY_DATA_TITLE_MEDIUM], mediums),
          [client.KEY_DATA_TITLE_LINKS]: data[server.KEY_DATA_TITLE_LINKS]
            .filter((link) => link[server.KEY_DATA_TITLE_LINK_TITLE] == id)
            .map((link, i) => ({
              [client.KEY_DATA_TITLE_LINK_ID]: i,
              [client.KEY_DATA_TITLE_LINK_RESOURCE]: server.resource(link[server.KEY_DATA_TITLE_LINK_RESOURCE], resources),
              [client.KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ANIME_ID]: link[server.KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ANIME_ID],
              [client.KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_SERIES_ID]: link[server.KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_SERIES_ID],
              [client.KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SERIES_SLUG]: link[server.KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SERIES_SLUG],
              [client.KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID]: link[server.KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID],
            })),
        };

        return result;
      }),
    ),
    [client.KEY_DATA_LOGS]: R.uniqBy(R.prop(server.KEY_DATA_LOG_TITLE), data[server.KEY_DATA_LOGS].toReversed())
      .map((log, i) => ({
        [client.KEY_DATA_LOG_ID]: i,
        [client.KEY_DATA_LOG_TITLE]: log[server.KEY_DATA_LOG_TITLE],
        [client.KEY_DATA_LOG_RATING]: log[server.KEY_DATA_LOG_RATING],
      })),
  };

  return result;
}