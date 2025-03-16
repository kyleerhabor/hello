<script>
  import Link from "./Link.svelte";
  import { isLocalURL } from "$lib/index";
  import { page } from "$app/state";

  const { href, title, children } = $props();
  const isLocal = isLocalURL(href, page.url);
</script>

<Link {isLocal}>
  <a {href} {title} target={isLocal ? "_self" : "_blank"}>
    {@render children?.()}
  </a>
</Link>
