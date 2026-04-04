<script>
  import Link from "./Link.svelte";
  import { isLocalURL } from "$lib/index";
  import { page } from "$app/state";

  const { href, title, children } = $props();
</script>

<Link {isLocal}>
  <a {href} {title} target={isLocalURL(href, page.url) ? "_self" : "_blank"}>
    {@render children?.()}
  </a>
</Link>
