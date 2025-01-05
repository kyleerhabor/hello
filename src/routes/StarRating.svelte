<script>
  import { isEven } from "$lib/index";
  import { PUBLIC_STAR_COLOR } from "$env/static/public";
  import { Star, StarHalf } from "lucide-svelte";

  const STAR_SIZE = 16;
  const { rating } = $props();
</script>

<div class="container">
  <!-- TODO: Declare rating system in code (i.e. extract magic numbers) -->
  <div class="stars">
    {#each { length: 5 }, rank}
      <!-- FIXME: strokeWidth scales in Safari -->
      <Star size={STAR_SIZE} color={PUBLIC_STAR_COLOR} strokeWidth="2" />
    {/each}
  </div>
  <div class="stars rating">
    {#each { length: Math.floor(rating / 2) }, rank}
      <Star size={STAR_SIZE} strokeWidth="0" fill={PUBLIC_STAR_COLOR} />
    {/each}

    <StarHalf size={STAR_SIZE} strokeWidth="0" fill={isEven(rating) ? "transparent" : PUBLIC_STAR_COLOR} />
  </div>
</div>

<style>
  .container {
    position: relative;
  }

  .stars {
    display: flex;
  }

  .rating {
    position: absolute;
    top: 0;
  }
</style>
