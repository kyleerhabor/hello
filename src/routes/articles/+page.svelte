<script>
  import { resolve } from "$app/paths";
  import { PUBLIC_NAME } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import {
    KEY_DATA_ARTICLES,
    KEY_DATA_ARTICLE_DATE,
    KEY_DATA_ARTICLE_ID,
    KEY_DATA_ARTICLE_TITLE,
  } from "$lib/server";

  const { data } = $props();
</script>

<svelte:head>
  <title>
    {m.articles_page_header_title({ name: PUBLIC_NAME })}
  </title>
</svelte:head>

<div class="header">
  <h1>
    {m.articles_page_title()}
  </h1>
</div>
<ol class="list">
  {#each data[KEY_DATA_ARTICLES] as article (article[KEY_DATA_ARTICLE_ID])}
    <li class="item">
      <a class="title"
         href={resolve(`/articles/${article[KEY_DATA_ARTICLE_ID]}`)}>
        {article[KEY_DATA_ARTICLE_TITLE]}
      </a>
      <span class="date">
        {m.article_date({ date: article[KEY_DATA_ARTICLE_DATE] })}
      </span>
    </li>
  {/each}
</ol>

<style>
  .header :global(h1) {
    margin-block: 0;
  }

  .list {
    list-style: none;
    padding-inline-start: 0;
    display: grid;
    grid-template-columns: max-content auto;
    column-gap: var(--spacing-base);
    row-gap: var(--articles-row-gap);
  }

  .item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: baseline;
  }

  .title {
    font-size: var(--font-size-lg);
  }

  .date {
    font-size: var(--font-size-sm);
    color: var(--text-secondary-color);
    white-space: nowrap;
  }
</style>
