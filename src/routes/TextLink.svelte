<script>
  import Link from "./Link.svelte";
  import { isLocalURL } from "$lib/index";
  import { page } from "$app/state";

  const { href, title, children } = $props();
  const isLocal = $derived(isLocalURL(href, page.url));
</script>

<Link isLocal={isLocal}>
  <!-- TODO: Figure out how to silence this lint. -->
  <a href={isLocal ? resolve(href) : href} {title} target={isLocal ? "_self" : "_blank"}>
    {@render children?.()}
  </a>
</Link>
