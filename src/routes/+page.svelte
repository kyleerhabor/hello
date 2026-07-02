<svelte:options runes={true} />
<script>
  import { PUBLIC_NAME } from "$env/static/public";
  import * as client from "$lib/server";

  const { data } = $props();
</script>

<svelte:head>
  <title>{PUBLIC_NAME}</title>
</svelte:head>

<div class="container">
  {@html data[client.KEY_DATA_HOME_CONTENT]}
</div>

<style>
  .container {
    max-width: var(--page-max-width);
    margin: auto;
    padding-inline: var(--page-padding-inline);
    margin-block-start: var(--spacing-base);
  }
</style>
