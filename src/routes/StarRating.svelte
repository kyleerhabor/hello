<script>
  import { isEven } from "$lib/index";
  import { PUBLIC_STAR_COLOR } from "$env/static/public";
  import { Star, StarHalf } from "lucide-svelte";

  const STAR_SIZE = 16;
  const { rating } = $props();
  const fullStars = Math.floor(rating / 2);
  const isHalfStar = !isEven(rating);
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

    {#if isHalfStar}
      <StarHalf size={STAR_SIZE} strokeWidth="0" fill={PUBLIC_STAR_COLOR} />
    {/if}
  </div>
</div>

<style>
   .container {
    position: relative;
    display: inline-block;
    width: max-content;
    line-height: 0;
  }

  .stars {
    display: flex;
    flex-wrap: nowrap;
  }

  .rating {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 0;
  }
</style>
