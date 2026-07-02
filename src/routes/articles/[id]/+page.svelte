<script>
  import { page } from "$app/stores";
  import { PUBLIC_NAME } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import * as server from "$lib/server";

  const { data } = $props();
</script>

<svelte:head>
  <title>
    {m.article_page_title({ title: data[server.KEY_DATA_ARTICLE_TITLE], name: PUBLIC_NAME })}
  </title>
  <meta name="description" content={data[server.KEY_DATA_ARTICLE_DESCRIPTION]} />
  <!-- og:image is required, but I don't care. -->
  <meta property="og:title" content={data[server.KEY_DATA_ARTICLE_TITLE]} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:description" content={data[server.KEY_DATA_ARTICLE_DESCRIPTION]} />
  <meta property="og:site_name" content={PUBLIC_NAME} />
  <meta property="og:article:published_time" content={data[server.KEY_DATA_ARTICLE_DATE]} />

</svelte:head>

<div class="header">
  <h1>
    {data[server.KEY_DATA_ARTICLE_TITLE]}
  </h1>
  <time class="date" datetime={data[server.KEY_DATA_ARTICLE_DATE]}>
    {m.article_date({ date: data[server.KEY_DATA_ARTICLE_DATE] })}
  </time>
</div>
<div class="body">
  {@html data[server.KEY_DATA_ARTICLE_CONTENT]}
</div>

<style>
  .header {
    margin-block-end: var(--spacing-xl);
    padding-block-end: var(--spacing-base);
    border-bottom: var(--border-width) solid var(--separator-color);
  }

  .header :global(h1) {
    margin-block: 0;
  }

  .date {
    display: block;
    color: var(--text-secondary-color);
    font-size: var(--font-size-sm);
  }

  .body :global(a) {
    text-underline-offset: var(--underline-offset);
  }

  .body :global(h2) {
    margin-block-start: var(--spacing-lg);
  }
</style>
