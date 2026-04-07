<script>
  import { PUBLIC_NAME } from "$env/static/public";
  import {
    KEY_SERVER_DATA_LOG_ID,
    KEY_SERVER_DATA_LOG_RATING,
    KEY_SERVER_DATA_LOG_TITLE,
    KEY_SERVER_DATA_MEDIUM_VALUE,
    KEY_SERVER_DATA_RESOURCE_VALUE,
    KEY_SERVER_DATA_TITLE_LINK_ID,
    KEY_SERVER_DATA_TITLE_LINK_RESOURCE,
    KEY_SERVER_DATA_TITLE_LINK_RESOURCE_ANIDB_ID,
    KEY_SERVER_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID,
    KEY_SERVER_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID,
    KEY_SERVER_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG,
    KEY_SERVER_DATA_TITLE_LINKS,
    KEY_SERVER_DATA_TITLE_MEDIUM,
    KEY_SERVER_DATA_TITLE_NAME,
    KEY_SERVER_PAGE_SERIES_LOGS,
    KEY_SERVER_PAGE_SERIES_MEDIUMS,
    KEY_SERVER_PAGE_SERIES_RESOURCES,
    KEY_SERVER_PAGE_SERIES_TITLES,
    SERVER_DATA_MEDIUM_VALUE_ANIMATION,
    SERVER_DATA_MEDIUM_VALUE_ANIME,
    SERVER_DATA_MEDIUM_VALUE_COMICS,
    SERVER_DATA_MEDIUM_VALUE_DONGHUA,
    SERVER_DATA_MEDIUM_VALUE_FILM,
    SERVER_DATA_MEDIUM_VALUE_MANGA,
    SERVER_DATA_MEDIUM_VALUE_MANHUA,
    SERVER_DATA_MEDIUM_VALUE_MANHWA,
    SERVER_DATA_MEDIUM_VALUE_NOVEL,
    SERVER_DATA_RESOURCE_VALUE_ANIDB,
    SERVER_DATA_RESOURCE_VALUE_MANGAUPDATES,
    SERVER_DATA_RESOURCE_VALUE_MYDRAMALIST,
    SERVER_DATA_RESOURCE_VALUE_NOVELUPDATES,
  } from "$lib/index";
  import "../../style/main.css";
  import StarRating from "../StarRating.svelte";

  const { data } = $props();

  function mediumName(value) {
    switch (value) {
      case SERVER_DATA_MEDIUM_VALUE_FILM:
        return "Film";
      case SERVER_DATA_MEDIUM_VALUE_ANIMATION:
        return "Animation";
      case SERVER_DATA_MEDIUM_VALUE_ANIME:
        return "Anime";
      case SERVER_DATA_MEDIUM_VALUE_DONGHUA:
        return "Donghua";
      case SERVER_DATA_MEDIUM_VALUE_NOVEL:
        return "Novel";
      case SERVER_DATA_MEDIUM_VALUE_COMICS:
        return "Comics";
      case SERVER_DATA_MEDIUM_VALUE_MANGA:
        return "Manga";
      case SERVER_DATA_MEDIUM_VALUE_MANHUA:
        return "Manhua";
      case SERVER_DATA_MEDIUM_VALUE_MANHWA:
        return "Manhwa";
    }
  }

  function resourceName(value) {
    switch (value) {
      case SERVER_DATA_RESOURCE_VALUE_ANIDB:
        return "AniDB";
      case SERVER_DATA_RESOURCE_VALUE_MANGAUPDATES:
        return "MangaUpdates";
      case SERVER_DATA_RESOURCE_VALUE_NOVELUPDATES:
        return "Novel Updates";
      case SERVER_DATA_RESOURCE_VALUE_MYDRAMALIST:
        return "MyDramaList";
    }
  }

  function anidbURL(link) {
    const id = link[KEY_SERVER_DATA_TITLE_LINK_RESOURCE_ANIDB_ID];
    const url = new URL(`anime/${id}`, "https://anidb.net/");

    return url;
  }

  function mangaupdatesURL(link) {
    const id = link[KEY_SERVER_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID];
    const url = new URL(`series/${id}`, "https://www.mangaupdates.com/");

    return url;
  }

  function novelupdatesURL(link) {
    const id = link[KEY_SERVER_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG];
    const url = new URL(`series/${id}`, "https://www.novelupdates.com/");

    return url;
  }

  function mydramalistURL(link) {
    const id = link[KEY_SERVER_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID];
    const url = new URL(`${id}`, "https://mydramalist.com/");

    return url;
  }

  function resourceURL(value, link) {
    switch (value) {
      case SERVER_DATA_RESOURCE_VALUE_ANIDB:
        return anidbURL(link);
      case SERVER_DATA_RESOURCE_VALUE_MANGAUPDATES:
        return mangaupdatesURL(link);
      case SERVER_DATA_RESOURCE_VALUE_NOVELUPDATES:
        return novelupdatesURL(link);
      case SERVER_DATA_RESOURCE_VALUE_MYDRAMALIST:
        return mydramalistURL(link);
    }
  }
</script>

<svelte:head>
  <title>Series Recs. | {PUBLIC_NAME}</title>
</svelte:head>

<div class="container">
  <table class="table">
    <colgroup>
      <col class="title-column" />
      <col class="medium-column" />
      <col class="rating-column" />
      <col class="links-column" />
    </colgroup>
    <thead>
      <tr class="row">
        <th scope="col" class="cell header">Title</th>
        <th scope="col" class="cell header">Medium</th>
        <th scope="col" class="cell header">Rating</th>
        <th scope="col" class="cell header">Links</th>
      </tr>
    </thead>
    <tbody>
      {#each data[KEY_SERVER_PAGE_SERIES_LOGS] as log (log[KEY_SERVER_DATA_LOG_ID])}
        {@const title = data[KEY_SERVER_PAGE_SERIES_TITLES][log[KEY_SERVER_DATA_LOG_TITLE]]}
        {@const name = title[KEY_SERVER_DATA_TITLE_NAME]}
        {@const medium = data[KEY_SERVER_PAGE_SERIES_MEDIUMS][title[KEY_SERVER_DATA_TITLE_MEDIUM]]}
        <tr class="row">
          <!-- TODO: Note accessibility improvements from using th over td.  -->
          <th class="cell title" scope="row">
            {name}
          </th>
          <td class="cell medium">
            {mediumName(medium[KEY_SERVER_DATA_MEDIUM_VALUE])}
          </td>
          <td class="cell rating">
            <StarRating rating={log[KEY_SERVER_DATA_LOG_RATING]} />
          </td>
          <td class="cell links">
            {#each title[KEY_SERVER_DATA_TITLE_LINKS] as link (link[KEY_SERVER_DATA_TITLE_LINK_ID])}
              {@const resource = data[KEY_SERVER_PAGE_SERIES_RESOURCES][link[KEY_SERVER_DATA_TITLE_LINK_RESOURCE]]}
              {@const name = resourceName(resource[KEY_SERVER_DATA_RESOURCE_VALUE])}
              {@const url = resourceURL(resource[KEY_SERVER_DATA_RESOURCE_VALUE], link)}
              <div>
                <a href={url} rel="external" target="_blank">
                  {name}
                </a>
              </div>
            {/each}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .container {
    margin-block: var(--series-table-margin-block);
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
    .container {
      overflow-x: auto;
    }

    .table {
      min-width: var(--series-table-min-width);
    }
  }
</style>