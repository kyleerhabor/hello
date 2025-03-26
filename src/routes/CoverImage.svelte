<script>
  const { assets, accentColor } = $props();

  const color = accentColor ? `rgb(${accentColor[0]},${accentColor[1]},${accentColor[2]})` : undefined;
  const asset = assets[assets.length - 1];
</script>

<picture class="cover-image"
         style:--accent-color={color}>
  <!-- FIXME: Background color creates a small line below the image  -->
  {#each assets.slice(0, -1) as asset}
    <source srcset={asset.path} type={asset.mimeType}>
  {/each}
  {#if asset}
    <img class="cover-image-item"
         src={asset.path}
         alt="Cover"
         decoding="async"
         loading="lazy">
  {/if}
</picture>

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
