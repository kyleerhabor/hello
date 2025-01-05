<script>
  import Link from "./Link.svelte";
  import { isLocalURL } from "$lib/index";

  const { href, url, children } = $props();
  const isLocal = isLocalURL(href, url);
</script>

<Link {isLocal}>
  <a {href} target={isLocal ? "_self" : "_blank"}>
    {@render children()}
  </a>
</Link>
