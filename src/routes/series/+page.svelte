<script>
  import StarRating from "../StarRating.svelte";
  import { PUBLIC_NAME } from "$env/static/public";
  import {
    KEY_SERVER_CONFIG_LOG_RATING,
    KEY_SERVER_CONFIG_LOG_TITLE,
    KEY_SERVER_CONFIG_MEDIUM_VALUE,
    KEY_SERVER_CONFIG_TITLE_MEDIUM,
    KEY_SERVER_CONFIG_TITLE_NAME,
  } from "$lib/index";
  import "../../style/main.css";

  const MEDIUMS = ["Animation", "Novel", "Comics", "Film", "Series"];
  const { data } = $props();

  function mediumName(x) {
    return MEDIUMS[x];
  }
</script>

<svelte:head>
  <title>Series Recs. | {PUBLIC_NAME}</title>
</svelte:head>

<div class="container">
  <table class="table">
    <colgroup>
      <col class="title-col" />
      <col class="medium-col" />
      <col class="rating-col" />
    </colgroup>
    <thead>
      <tr class="row">
        <th scope="col" class="cell header">Title</th>
        <th scope="col" class="cell header">Medium</th>
        <th scope="col" class="cell header">Rating</th>
      </tr>
    </thead>
    <tbody>
      {#each data.logs as log}
        {@const title = data.titles[log[KEY_SERVER_CONFIG_LOG_TITLE]]}
        {@const titleName = title[KEY_SERVER_CONFIG_TITLE_NAME]}
        {@const medium = data.mediums[title[KEY_SERVER_CONFIG_TITLE_MEDIUM]]}
        <tr class="row">
          <!-- TODO: Note accessibility improvements from using th over td.  -->
          <th class="cell title" scope="row">
            {titleName}
          </th>
          <td class="cell medium">
            {mediumName(medium[KEY_SERVER_CONFIG_MEDIUM_VALUE])}
          </td>
          <td class="cell rating">
            <StarRating rating={log[KEY_SERVER_CONFIG_LOG_RATING]} />
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
  }

  .cell {
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

  .title-col {
    width: 100%;
  }

  .medium-col {
    width: auto;
  }

  .rating-col {
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