<script>
  const { src } = $props();
</script>

<div class="cover-image">
  <img class="cover-image-item" {src} alt="Cover" decoding="async" loading="lazy" />
</div>

<style>
  .cover-image {
    aspect-ratio: 2 / 3;
  }

  .cover-image-item {
    border-radius: var(--cover-image-border-radius);
    min-width: var(--cover-image-width);
    height: 100%;
    object-fit: cover;
  }
</style>
