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
  <!-- og:image is required, but I don't care. -->
  <meta property="og:title" content={data[server.KEY_DATA_ARTICLE_TITLE]} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={$page.url.href} />
  <meta property="og:description" content={data[server.KEY_DATA_ARTICLE_DESCRIPTION]} />
  <meta property="og:site_name" content={PUBLIC_NAME} />
  <meta property="og:article:published_time" content={data[server.KEY_DATA_ARTICLE_DATE]} />
</svelte:head>

<div id="id">
  <div class="article-layout">
    <aside class="toc">
      <nav>
        <ul class="toc-list">
          <li class="toc-item toc-item-top">
            <a class="toc-link" href="#top">Top</a>
          </li>
          {#each data[server.KEY_DATA_ARTICLE_HEADINGS] as heading (heading.id)}
            <li class="toc-item toc-depth-{heading.depth}">
              <a class="toc-link" href="#{heading.id}">
                {heading.text}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>
    <article class="article-content">
      <div class="header">
        <div>
          <h1 class="heading">
            {data[server.KEY_DATA_ARTICLE_TITLE]}
          </h1>
          <time class="date" datetime={data[server.KEY_DATA_ARTICLE_DATE]}>
            {m.article_date({ date: data[server.KEY_DATA_ARTICLE_DATE] })}
          </time>
        </div>
      </div>
      <div class="body">
        {@html data[server.KEY_DATA_ARTICLE_CONTENT]}
      </div>
    </article>
  </div>
</div>

<style>
  .article-layout {
    display: grid;
    grid-template-columns: 1fr minmax(0, var(--page-max-width)) 1fr;
    column-gap: var(--spacing-xl);
    align-items: start;
  }

  .toc {
    grid-column: 1;
    justify-self: end;
    position: sticky;
    top: var(--header-height);
    max-height: calc(100vh - var(--header-height) - var(--spacing-base));
    overflow-y: auto;
    font-size: var(--font-size-sm);
    padding-block-start: var(--spacing-base);
  }

  .toc-list {
    list-style: none;
    padding-inline-start: 0;
    margin: 0;
  }

  .toc-item + .toc-item {
    margin-block-start: var(--spacing-xs);
  }

  .toc-link {
    text-decoration: none;
    color: var(--text-secondary-color);
  }

  .toc-link:hover {
    color: inherit;
    text-decoration: underline;
  }

  .toc-depth-2 {
    padding-inline-start: 0;
  }

  .toc-depth-3 {
    padding-inline-start: var(--toc-indent);
  }

  .toc-depth-4 {
    padding-inline-start: calc(var(--toc-indent) * 2);
  }

  .toc-depth-5 {
    padding-inline-start: calc(var(--toc-indent) * 3);
  }

  .toc-depth-6 {
    padding-inline-start: calc(var(--toc-indent) * 4);
  }

  .article-content {
    grid-column: 2;
    padding-inline: var(--page-padding-inline);
    margin-block-start: var(--spacing-base);
    min-width: 0;
  }

  @media (max-width: 800px) {
    .article-layout {
      grid-template-columns: 1fr;
    }

    .toc {
      display: none;
    }

    .article-content {
      grid-column: 1;
    }
  }

  .header {
    margin-block-end: var(--spacing-xl);
    padding-block-end: var(--spacing-base);
    border-bottom: var(--border-width) solid var(--separator-color);
  }

  .heading {
    margin-block: 0;
    overflow-wrap: anywhere;
  }

  .date {
    display: block;
    color: var(--text-secondary-color);
    font-size: var(--font-size-sm);
  }

  .body :global(code) {
    overflow-wrap: anywhere;
  }

  .body :global(img) {
    margin-inline: auto;
  }
</style>
