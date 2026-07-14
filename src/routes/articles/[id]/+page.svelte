<script>
  import { page } from "$app/stores";
  import { PUBLIC_NAME } from "$env/static/public";
  import { m } from "$lib/paraglide/messages";
  import * as server from "$lib/server";

  const { data } = $props();
  let toc = $state(null);
  let activeHeading = $state(null);
  $effect(() => {
    const body = document.querySelector(".body");
    const headings = [...body.querySelectorAll("h2, h3, h4, h5, h6")];

    if (headings.length === 0) {
      return;
    }

    /** @type {Set<string>} */
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const visibleHeadings = new Set();
    const headerHeight = parseFloat(getComputedStyle(toc).top);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.add(entry.target.id);
          } else {
            visibleHeadings.delete(entry.target.id);
          }

          for (const heading of headings.toReversed()) {
            if (heading.getBoundingClientRect().top > headerHeight) {
              continue;
            }

            activeHeading = heading.id;

            return;
          }

          activeHeading = null;
        })
      },
      {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  });
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
    <aside class="toc" bind:this={toc}>
      <nav>
        <ul class="toc-list">
          <li class="toc-item toc-item-top">
            <a class="toc-link"
               class:toc-link-active={activeHeading === null}
               href="#top">Top</a>
          </li>
          {#each data[server.KEY_DATA_ARTICLE_HEADINGS] as heading (heading.id)}
            <li class="toc-item toc-depth-{heading.depth}">
              <a class="toc-link"
                 class:toc-link-active={activeHeading === heading.id}
                 href="#{heading.id}">
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
      {#if data[server.KEY_DATA_ARTICLE_FOOTNOTES].length !== 0}
        <section class="footnotes">
          <h2 class="footnote-heading">
            Footnotes
          </h2>
          <ol class="footnote-list">
            {#each data[server.KEY_DATA_ARTICLE_FOOTNOTES] as footnote (footnote.id)}
              <li class="footnote-item">
                <a href={footnote.backref} data-footnote-backref aria-label="Back to reference {footnote.id}">
                  [{footnote.id}]
                </a>
                <div id={footnote.htmlID} class="footnote-content">
                  {@html footnote.html}
                </div>
              </li>
            {/each}
          </ol>
        </section>
      {/if}
    </article>
  </div>
</div>

<style>
  .article-layout {
    align-items: start;
    column-gap: var(--spacing-xl);
    display: grid;
    grid-template-columns: 1fr minmax(0, var(--page-max-width)) 1fr;
  }

  .toc {
    font-size: var(--font-size-sm);
    grid-column: 1;
    justify-self: end;
    max-height: calc(100vh - var(--header-height) - var(--spacing-base));
    overflow-y: auto;
    padding-block-start: var(--spacing-base);
    padding-inline-start: var(--spacing-base);
    position: sticky;
    top: var(--header-height);
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

  .toc-link-active {
    color: inherit;
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

  @media (max-width: 1200px) {
    .article-layout {
      column-gap: inherit;
      grid-template-columns: 1fr minmax(0, var(--page-max-width)) 1fr;
    }

    .toc {
      display: none;
    }

    .article-content {
      grid-column: 2;
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

  .body :global(blockquote) {
    margin-inline: 0;
    padding-inline-start: var(--spacing-base);
    border-inline-start: var(--border-width-thick) solid var(--separator-color);
    font-style: italic;
    color: var(--text-secondary-color);
  }

  /* In the future, we should prefer margin-trim when it becomes baseline.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-trim
   */

  .body :global(blockquote > :first-child) {
    margin-block: 0;
  }

  .body :global(blockquote > :last-child) {
    margin-block-end: 0;
  }

  .footnotes {
    border-top: 1px solid var(--separator-color);
    color: var(--text-secondary-color);
    font-size: smaller;
    margin-block-start: var(--spacing-xl);
  }

  .footnote-heading {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    padding: 0;
    position: absolute;
    overflow: hidden;
    width: 1px;
    word-wrap: normal;
  }

  .footnote-list {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5ch;
    list-style: none;
    padding-left: 0;
  }

  .footnote-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
  }

  .footnote-content:target {
    background: var(--background-secondary-color);
    border-radius: var(--spacing-sm);
    padding-inline: var(--spacing-xs);
  }

  .footnote-content > :global(:first-child) {
    margin-block-start: 0;
  }

  .footnote-content > :global(:last-child) {
    margin-block-end: 0;
  }
</style>
