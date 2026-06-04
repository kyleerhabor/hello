<script>
  import { PUBLIC_NAME } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import { baseLocale, getLocale } from "$lib/paraglide/runtime";
  import * as server from "$lib/server";
  import StarRating from "../StarRating.svelte";

  const { data } = $props();

  function displayTitleName(title) {
    const key = title[server.KEY_DATA_TITLE_NAME];
    // TODO: Don't depend on this page's structure of data.
    const messages = data[server.KEY_DATA_LOCALIZATIONS][key][server.KEY_DATA_LOCALIZATION_MESSAGES];
    // I haven't tested whether or not this works with other locales.
    const locale = getLocale();
    const message = messages[locale] ?? messages[baseLocale];
    const name = message[server.KEY_DATA_LOCALIZATION_MESSAGE_MESSAGE];

    return name;
  }

  function displayMediumName({ value }) {
    switch (value) {
      case server.DATA_MEDIUM_VALUE_FILM:
        return m.series_medium_film();
      case server.DATA_MEDIUM_VALUE_ANIMATION:
        return m.series_medium_animation();
      case server.DATA_MEDIUM_VALUE_ANIME:
        return m.series_medium_anime();
      case server.DATA_MEDIUM_VALUE_DONGHUA:
        return m.series_medium_donghua();
      case server.DATA_MEDIUM_VALUE_NOVEL:
        return m.series_medium_novel();
      case server.DATA_MEDIUM_VALUE_COMICS:
        return m.series_medium_comics();
      case server.DATA_MEDIUM_VALUE_MANGA:
        return m.series_medium_manga();
      case server.DATA_MEDIUM_VALUE_MANHUA:
        return m.series_medium_manhua();
      case server.DATA_MEDIUM_VALUE_MANHWA:
        return m.series_medium_manhwa();
    }
  }

  function logRating(log) {
    return log[server.KEY_DATA_LOG_RATING];
  }

  function logMessage(log) {
    const title = log[server.KEY_DATA_LOG_TITLE];
    const name = displayTitleName(data[server.KEY_DATA_TITLES][title]);

    return name;
  }

  function logMedium(log) {
    const title = log[server.KEY_DATA_LOG_TITLE];
    const name = displayMediumName({ value: data[server.KEY_DATA_TITLES][title][server.KEY_DATA_TITLE_MEDIUM] });

    return name;
  }

  const logs = $derived(
    data[server.KEY_DATA_LOGS].toSorted((a, b) =>
      logRating(b) - logRating(a)
      || logMessage(a).localeCompare(logMessage(b), getLocale())
      || logMedium(a).localeCompare(logMedium(b), getLocale()),
    ),
  );

  function displayLinkName({ resource }) {
    switch (resource) {
      case server.DATA_RESOURCE_VALUE_ANIDB_ANIME:
        return m.series_link_anidb();
      case server.DATA_RESOURCE_VALUE_MANGAUPDATES_SERIES:
        return m.series_link_mangaupdates();
      case server.DATA_RESOURCE_VALUE_NOVELUPDATES_SERIES:
        return m.series_link_novelupdates();
      case server.DATA_RESOURCE_VALUE_MYDRAMALIST:
        return m.series_link_mydramalist();
    }
  }

  function displayAnidbAnimeURL({ anidbAnimeID: id }) {
    return new URL(id, "https://anidb.net/anime/");
  }

  function displayMangaupdatesSeriesURL({ mangaupdatesSeriesID: id }) {
    return new URL(id, "https://www.mangaupdates.com/series/");
  }

  function displayNovelupdatesSeriesURL({ novelupdatesSeriesSlug: slug }) {
    return new URL(slug, "https://www.novelupdates.com/series/");
  }

  function displayMydramalistURL({ mydramalistID: id }) {
    return new URL(id, "https://mydramalist.com/");
  }

  function displayLinkURL(link) {
    switch (link.resource) {
      case server.DATA_RESOURCE_VALUE_ANIDB_ANIME:
        return displayAnidbAnimeURL(link);
      case server.DATA_RESOURCE_VALUE_MANGAUPDATES_SERIES:
        return displayMangaupdatesSeriesURL(link);
      case server.DATA_RESOURCE_VALUE_NOVELUPDATES_SERIES:
        return displayNovelupdatesSeriesURL(link);
      case server.DATA_RESOURCE_VALUE_MYDRAMALIST:
        return displayMydramalistURL(link);
    }
  }
</script>

<svelte:head>
  <title>
    {m.series_page_title({ name: PUBLIC_NAME })}
  </title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>{m.series_page_header_title()}</h1>
    <p>{m.series_page_header_description()}</p>
  </div>
  <div class="table-outline">
    <table class="table">
      <colgroup>
        <col class="title-column" />
        <col class="medium-column" />
        <col class="rating-column" />
        <col class="links-column" />
      </colgroup>
      <thead>
        <tr class="row">
          <th scope="col" class="cell header">
            {m.series_column_title()}
          </th>
          <th scope="col" class="cell header">
            {m.series_column_medium()}
          </th>
          <th scope="col" class="cell header">
            {m.series_column_rating()}
          </th>
          <th scope="col" class="cell header">
            {m.series_column_links()}
          </th>
        </tr>
      </thead>
      <tbody>
        {#each logs as log (log[server.KEY_DATA_LOG_ID])}
          {const title = $derived(data[server.KEY_DATA_TITLES][log[server.KEY_DATA_LOG_TITLE]])}
          {const mediumDisplay = $derived({ value: title[server.KEY_DATA_TITLE_MEDIUM] })}
          <tr class="row">
            <!-- TODO: Note accessibility improvements from using th over td.  -->
            <th class="cell title" scope="row">
              {displayTitleName(title, data)}
            </th>
            <td class="cell medium">
              {displayMediumName(mediumDisplay)}
            </td>
            <td class="cell rating">
              <StarRating rating={log[server.KEY_DATA_LOG_RATING]} />
            </td>
            <td class="cell links">
              {#each title[server.KEY_DATA_TITLE_LINKS] as link (link[server.KEY_DATA_TITLE_LINK_ID])}
                {const linkDisplay = $derived(
                  {
                    resource: link[server.KEY_DATA_TITLE_LINK_RESOURCE],
                    anidbAnimeID: link[server.KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ANIME_ID],
                    mangaupdatesSeriesID: link[server.KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_SERIES_ID],
                    novelupdatesSeriesSlug: link[server.KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SERIES_SLUG],
                    mydramalistID: link[server.KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID],
                  },
                // eslint-disable-next-line @stylistic/semi
                )}
                <div>
                  <a href={displayLinkURL(linkDisplay)} rel="external" target="_blank">
                    {displayLinkName(linkDisplay)}
                  </a>
                </div>
              {/each}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .page {
    margin-block: var(--series-table-margin-block);
  }

  .page-header {
    margin-block-end: var(--series-header-table-gap);
  }

  .table-outline {
    border: 1px solid var(--header-divider-color);
    border-radius: var(--series-table-border-radius);
    overflow: hidden;
    background: var(--background-color);
  }

  .table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: auto;
  }

  .cell {
    padding-block: var(--series-table-cell-padding-block);
    padding-inline: var(--series-table-cell-padding-inline);
    text-align: start;
  }

  .header {
    font-weight: 600;
    color: var(--series-table-header-text-color);
    background: var(--series-table-header-background-color);
    border-bottom: 1px solid var(--header-divider-color);
  }

  .row:not(:last-child) .cell {
    border-bottom: 1px solid var(--series-table-row-divider-color);
  }

  .title-column {
    width: 100%;
  }

  .medium-column {
    width: auto;
  }

  .rating-column {
    width: auto;
  }

  .links-column {
    width: auto;
  }

  .title {
    text-align: start;
    font-weight: 400;
  }

  @media (max-width: 500px) {
    .table-outline {
      overflow-x: auto;
    }

    .table {
      min-width: var(--series-table-min-width);
    }
  }
</style>
