<svelte:options runes={true} />
<script>
  import { PUBLIC_NAME } from "$env/static/public";
  import * as client from "$lib/server";
  const { data } = $props();
</script>

<svelte:head>
  <title>{PUBLIC_NAME}</title>
</svelte:head>

{@html data[client.KEY_DATA_HOME_CONTENT]}
