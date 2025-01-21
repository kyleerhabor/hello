<script>
  const { src, accentColor } = $props();

  const color = $derived(accentColor ? `rgb(${accentColor[0]},${accentColor[1]},${accentColor[2]})` : undefined);
</script>

<div class="cover-image"
     style:--accent-color={color}>
  <!-- FIXME: Background color creates a small line below the image  -->
  <img class="cover-image-item"
       {src}
       alt="Cover"
       decoding="async"
       loading="lazy" />
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
