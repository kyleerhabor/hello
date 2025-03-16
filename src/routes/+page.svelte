<script>
  import TextLink from "./TextLink.svelte";
  // I would prefer AsciiDoc, but there is no good process to integrate it into a Svelte 5 codebase.
  import SvelteMarkdown from "@humanspeak/svelte-markdown";
  import source from "$lib/assets/text/about.md?raw";

  const renderers = {
    link: TextLink,
  };
</script>

<svelte:head>
  <title>Kyle Erhabor</title>
</svelte:head>

<SvelteMarkdown {source} {renderers} />
