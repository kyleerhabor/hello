<script>
  import CoverImage from "../CoverImage.svelte";
  import StarRating from "../StarRating.svelte";
  import {
    KEY_SERVER_CONFIG_LOG_RATING,
    KEY_SERVER_CONFIG_LOG_TITLE,
    KEY_SERVER_CONFIG_MEDIUM_VALUE,
    KEY_SERVER_CONFIG_TITLE_MEDIUM,
    KEY_SERVER_CONFIG_TITLE_NAME,
    KEY_SERVER_PAGE_TITLE_ACCENT_COLOR,
    KEY_SERVER_PAGE_TITLE_COVER_IMAGES,
  } from "$lib/index";
  import "../../style/cssremedy.css";
  import "../../style/main.css";

  const MEDIUM_ANIMATION = 0;
  const MEDIUM_NOVEL = 1;
  const MEDIUM_COMICS = 2;
  const MEDIUM_FILM = 3;
  const MEDIUM_SERIES = 4;
  const MEDIUMS = ["Animation", "Novel", "Comics", "Film", "Series"];
  const { data } = $props();

  function mediumName(x) {
    return MEDIUMS[x];
  }
</script>

<svelte:head>
  <title>Series Recs. | Kyle Erhabor</title>
</svelte:head>

<div class="grid">
  {#each data.logs as log}
    {@const title = data.titles[log[KEY_SERVER_CONFIG_LOG_TITLE]]}
    {@const titleName = title[KEY_SERVER_CONFIG_TITLE_NAME]}
    {@const medium = data.mediums[title[KEY_SERVER_CONFIG_TITLE_MEDIUM]]}
    <div class="grid-item">
      <div class="grid-item-cover-image">
        <CoverImage images={title[KEY_SERVER_PAGE_TITLE_COVER_IMAGES]}
                    accentColor={title[KEY_SERVER_PAGE_TITLE_ACCENT_COLOR]} />
      </div>
      <!-- TODO: Figure out a way to display an arbitrarily long title in a non-fixed way. -->
      <div class="title line-limit" title={titleName}>{titleName}</div>
      <div class="medium">
        {mediumName(medium[KEY_SERVER_CONFIG_MEDIUM_VALUE])}
      </div>
      <div>
        <StarRating rating={log[KEY_SERVER_CONFIG_LOG_RATING]} />
      </div>
    </div>
  {/each}
</div>

<style>
  :root {
    --cover-image-width: 100px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--cover-image-width), 1fr)
    );
    gap: 16px 12px;
    margin-top: var(--container-inset);
  }

  .grid-item {
    display: flex;
    flex-direction: column;
  }

  .grid-item-cover-image {
    --cover-image-border-radius: 4px;
  }

  .title {
    --line-height: 1.5rem;
    --line-count: 2;
    margin-top: calc(var(--line-height) / 3);
  }

  .medium {
    font-variant-caps: all-petite-caps;
    font-weight: 600;
    /* TODO: Name. */
    color: hsl(0deg 0% 60%);
  }
</style>
