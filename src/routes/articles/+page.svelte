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

<div class="container">
  <div class="header">
    <h1 class="heading">
      {m.articles_page_title()}
    </h1>
  </div>
  <ol class="list">
    {#each data[KEY_DATA_ARTICLES] as article (article[KEY_DATA_ARTICLE_ID])}
      {const id = article[KEY_DATA_ARTICLE_ID]}
      <li class="item">
        <a class="title" href={resolve(`/articles/${id}`)}>
          {article[KEY_DATA_ARTICLE_TITLE]}
        </a>
        <span class="date">
          {m.article_date({ date: article[KEY_DATA_ARTICLE_DATE] })}
        </span>
      </li>
    {/each}
  </ol>
</div>

<style>
  .container {
    margin: auto;
    margin-block-start: var(--spacing-base);
    max-width: min(var(--page-max-width), 100%);
    padding-inline: var(--page-padding-inline);
  }

  .heading {
    margin-block: 0;
  }

  .list {
    column-gap: var(--spacing-base);
    display: grid;
    grid-template-columns: minmax(0, max-content) auto;
    list-style: none;
    padding-inline-start: 0;
    row-gap: var(--articles-row-gap);
  }

  .item {
    align-items: baseline;
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }

  .title {
    font-size: var(--font-size-lg);
  }

  .date {
    color: var(--text-secondary-color);
    font-size: var(--font-size-sm);
    white-space: nowrap;
  }
</style>
