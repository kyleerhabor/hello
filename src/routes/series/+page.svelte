<script>
  import CoverImage from "../CoverImage.svelte";
  import StarRating from "../StarRating.svelte";
  import "../../style/cssremedy.css";
  import "../../style/main.css"

  const MEDIUM_ANIMATION = 0;
  const MEDIUM_NOVEL = 1;
  const MEDIUM_COMICS = 2;
  const MEDIUM_FILM = 3;
  const MEDIUM_SERIES = 4;
  const MEDIUMS = ["Animation", "Novel", "Comics", "Film", "Series"]
  const { data } = $props();

  function medium(x) {
    return MEDIUMS[x];
  }
</script>

<svelte:head>
  <title>Series Recs. | Kyle Erhabor</title>
</svelte:head>

<div class="grid">
  {#each data.logs as log}
    {@const title = data.titles[log.titleID]}
    {@const med = data.mediums[title.medium]}
    <div class="grid-item">
      <div class="grid-item-cover-image">
        <CoverImage src={title.coverImagePath} accentColor={title.accentColor} />
      </div>
      <div class="title line-limit">{title.name}</div>
      <div class="medium">{medium(med.value)}</div>
      <div>
        <StarRating rating={log.rating ?? 0} />
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
    grid-template-columns: repeat(auto-fit, minmax(var(--cover-image-width), 1fr));
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
