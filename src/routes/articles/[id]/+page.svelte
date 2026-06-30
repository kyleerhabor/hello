<script>
  import { PUBLIC_NAME } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import { KEY_DATA_ARTICLE_CONTENT, KEY_DATA_ARTICLE_DATE, KEY_DATA_ARTICLE_TITLE } from "$lib/server";

  const { data } = $props();
</script>

<svelte:head>
  <title>
    {m.article_page_title({ title: data[KEY_DATA_ARTICLE_TITLE], name: PUBLIC_NAME })}
  </title>
</svelte:head>

<div class="header">
  <h1>
    {data[KEY_DATA_ARTICLE_TITLE]}
  </h1>
  <time class="date" datetime={data[KEY_DATA_ARTICLE_DATE]}>
    {m.article_date({ date: data[KEY_DATA_ARTICLE_DATE] })}
  </time>
</div>
<div class="body">
  {@html data[KEY_DATA_ARTICLE_CONTENT]}
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
