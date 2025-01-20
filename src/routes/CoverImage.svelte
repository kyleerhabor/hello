<script>
  const { src, color } = $props();

  const rgb = $derived(color ? `rgb(${color[0]},${color[1]},${color[2]})` : undefined);
</script>

<div class="cover-image">
  <!-- FIXME: Background color creates a small line below the image  -->
  <img class="cover-image-item"
       style:background-color={rgb}
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
  }
</style>
