<script>
    import { KEY_SERVER_PAGE_TITLE_COVER_IMAGE_MIME_TYPE, KEY_SERVER_PAGE_TITLE_COVER_IMAGE_PATH } from "$lib";

  const { images, accentColor } = $props();

  // Do we need $derived here?
  const color = accentColor ? `rgb(${accentColor[0]},${accentColor[1]},${accentColor[2]})` : undefined;
  const primaryImage = images[images.length - 1];
</script>

<div class="cover-image"
     style:--accent-color={color}>
  <picture>
    <!-- FIXME: Background color creates a small line below the image  -->
    {#each images.slice(0, -1) as asset}
      <source srcset={asset[KEY_SERVER_PAGE_TITLE_COVER_IMAGE_PATH]}
              type={asset[KEY_SERVER_PAGE_TITLE_COVER_IMAGE_MIME_TYPE]}>
    {/each}
    {#if primaryImage}
      <img class="cover-image-item"
           src={primaryImage[KEY_SERVER_PAGE_TITLE_COVER_IMAGE_PATH]}
           alt="Cover"
           decoding="async"
           loading="lazy">
    {/if}
  </picture>
</div>

<style>
  .cover-image {
    aspect-ratio: 2 / 3;
  }

  .cover-image-item {
    min-width: var(--cover-image-width);
    border-radius: var(--cover-image-border-radius);
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--accent-color);
  }
</style>
