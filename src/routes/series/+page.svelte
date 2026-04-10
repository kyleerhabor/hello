<script>
  import { PUBLIC_NAME } from "$env/static/public";
  import {
    DATA_MEDIUM_VALUE_ANIMATION,
    DATA_MEDIUM_VALUE_ANIME,
    DATA_MEDIUM_VALUE_COMICS,
    DATA_MEDIUM_VALUE_DONGHUA,
    DATA_MEDIUM_VALUE_FILM,
    DATA_MEDIUM_VALUE_MANGA,
    DATA_MEDIUM_VALUE_MANHUA,
    DATA_MEDIUM_VALUE_MANHWA,
    DATA_MEDIUM_VALUE_NOVEL,
    DATA_RESOURCE_VALUE_ANIDB,
    DATA_RESOURCE_VALUE_MANGAUPDATES,
    DATA_RESOURCE_VALUE_MYDRAMALIST,
    DATA_RESOURCE_VALUE_NOVELUPDATES,
  } from "$lib";
  import {
    KEY_DATA_LOG_ID,
    KEY_DATA_LOG_RATING,
    KEY_DATA_LOG_TITLE,
    KEY_DATA_MEDIUM_VALUE,
    KEY_DATA_RESOURCE_VALUE,
    KEY_DATA_TITLE_LINK_ID,
    KEY_DATA_TITLE_LINK_RESOURCE,
    KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ID,
    KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID,
    KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID,
    KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG,
    KEY_DATA_TITLE_LINKS,
    KEY_DATA_TITLE_MEDIUM,
    KEY_DATA_TITLE_NAME,
    KEY_PAGE_SERIES_LOGS,
    KEY_PAGE_SERIES_MEDIUMS,
    KEY_PAGE_SERIES_RESOURCES,
    KEY_PAGE_SERIES_TITLES,
  } from "../series";
  import "../../style/main.css";
  import StarRating from "../StarRating.svelte";
  import { m } from "$lib/paraglide/messages";

  const { data } = $props();

  function mediumName(value) {
    switch (value) {
      case DATA_MEDIUM_VALUE_FILM:
        return m.series_medium_film();
      case DATA_MEDIUM_VALUE_ANIMATION:
        return m.series_medium_animation();
      case DATA_MEDIUM_VALUE_ANIME:
        return m.series_medium_anime();
      case DATA_MEDIUM_VALUE_DONGHUA:
        return m.series_medium_donghua();
      case DATA_MEDIUM_VALUE_NOVEL:
        return m.series_medium_novel();
      case DATA_MEDIUM_VALUE_COMICS:
        return m.series_medium_comics();
      case DATA_MEDIUM_VALUE_MANGA:
        return m.series_medium_manga();
      case DATA_MEDIUM_VALUE_MANHUA:
        return m.series_medium_manhua();
      case DATA_MEDIUM_VALUE_MANHWA:
        return m.series_medium_manhwa();
    }
  }

  function resourceName(value) {
    switch (value) {
      case DATA_RESOURCE_VALUE_ANIDB:
        return m.series_link_anidb();
      case DATA_RESOURCE_VALUE_MANGAUPDATES:
        return m.series_link_mangaupdates();
      case DATA_RESOURCE_VALUE_NOVELUPDATES:
        return m.series_link_novelupdates();
      case DATA_RESOURCE_VALUE_MYDRAMALIST:
        return m.series_link_mydramalist();
    }
  }

  function anidbURL(link) {
    const id = link[KEY_DATA_TITLE_LINK_RESOURCE_ANIDB_ID];
    const url = new URL(`anime/${id}`, "https://anidb.net/");

    return url;
  }

  function mangaupdatesURL(link) {
    const id = link[KEY_DATA_TITLE_LINK_RESOURCE_MANGAUPDATES_ID];
    const url = new URL(`series/${id}`, "https://www.mangaupdates.com/");

    return url;
  }

  function novelupdatesURL(link) {
    const id = link[KEY_DATA_TITLE_LINK_RESOURCE_NOVELUPDATES_SLUG];
    const url = new URL(`series/${id}`, "https://www.novelupdates.com/");

    return url;
  }

  function mydramalistURL(link) {
    const id = link[KEY_DATA_TITLE_LINK_RESOURCE_MYDRAMALIST_ID];
    const url = new URL(`${id}`, "https://mydramalist.com/");

    return url;
  }

  function resourceURL(value, link) {
    switch (value) {
      case DATA_RESOURCE_VALUE_ANIDB:
        return anidbURL(link);
      case DATA_RESOURCE_VALUE_MANGAUPDATES:
        return mangaupdatesURL(link);
      case DATA_RESOURCE_VALUE_NOVELUPDATES:
        return novelupdatesURL(link);
      case DATA_RESOURCE_VALUE_MYDRAMALIST:
        return mydramalistURL(link);
    }
  }
</script>

<svelte:head>
  <title>
    {m.series_page_title({ name: PUBLIC_NAME })}
  </title>
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
      {#each data[KEY_PAGE_SERIES_LOGS] as log (log[KEY_DATA_LOG_ID])}
        {@const title = data[KEY_PAGE_SERIES_TITLES][log[KEY_DATA_LOG_TITLE]]}
        {@const name = title[KEY_DATA_TITLE_NAME]}
        {@const medium = data[KEY_PAGE_SERIES_MEDIUMS][title[KEY_DATA_TITLE_MEDIUM]]}
        <tr class="row">
          <!-- TODO: Note accessibility improvements from using th over td.  -->
          <th class="cell title" scope="row">
            {name}
          </th>
          <td class="cell medium">
            {mediumName(medium[KEY_DATA_MEDIUM_VALUE])}
          </td>
          <td class="cell rating">
            <StarRating rating={log[KEY_DATA_LOG_RATING]} />
          </td>
          <td class="cell links">
            {#each title[KEY_DATA_TITLE_LINKS] as link (link[KEY_DATA_TITLE_LINK_ID])}
              {@const resource = data[KEY_PAGE_SERIES_RESOURCES][link[KEY_DATA_TITLE_LINK_RESOURCE]]}
              {@const name = resourceName(resource[KEY_DATA_RESOURCE_VALUE])}
              {@const url = resourceURL(resource[KEY_DATA_RESOURCE_VALUE], link)}
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