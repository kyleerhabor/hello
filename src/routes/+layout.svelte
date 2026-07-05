<script>
	import { onNavigate } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import {
	  PUBLIC_NAME,
	  PUBLIC_SOCIAL_EMAIL_ADDRESS,
	  PUBLIC_SOCIAL_GITHUB_URL,
	} from "$env/static/public";
	import { m } from "$lib/paraglide/messages";
	import { locales, localizeHref } from "$lib/paraglide/runtime";
	import "../style/main.css";

	let { children } = $props();
	onNavigate((navigation) => {
	  if (!document.startViewTransition) {
	    return;
	  }

	  return new Promise((resolve) => {
	    document.startViewTransition(async () => {
	      resolve();
	      await navigation.complete;
	    });
	  });
	});
</script>

<div class="header-parent">
	<header class="container header">
		<a class="name-link" href={resolve("/")}>
      <h1 class="name">
        {PUBLIC_NAME}
      </h1>
    </a>
		<nav>
			<ul class="navigation">
				<!-- <li>
					<a href="{resolve("/cv")}">
						CV
					</a>
				</li> -->
				<li>
          <a href={resolve("/articles")}>
            {m.nav_link_articles()}
          </a>
        </li>
				<li>
          <a href={resolve("/series")}>
            {m.nav_link_series()}
          </a>
        </li>
				<li>
          |
        </li>
				<li>
          <a href="mailto:{PUBLIC_SOCIAL_EMAIL_ADDRESS}">
            {m.nav_link_email()}
          </a>
        </li>
				<li>
					<a href={PUBLIC_SOCIAL_GITHUB_URL} rel="external" target="_blank">
            {m.nav_link_github()}
          </a>
				</li>
			</ul>
		</nav>
	</header>
</div>
<main class="content">
  {@render children()}
</main>
<div style="display:none">
	{#each locales as locale (locale)}
		<a href={resolve(localizeHref(page.url.pathname, { locale }))}>
      {locale}
    </a>
	{/each}
</div>

<style>
	:root {
		color-scheme: light dark;
		background-color: var(--background-color);
		font-family: system-ui, sans-serif;
		font-weight: normal;
	}

	.container {
    max-width: var(--page-max-width);
    margin: auto;
    padding-inline: var(--page-padding-inline);
	}

	.header-parent {
		position: sticky;
		top: 0;
		min-height: var(--header-height);
		box-sizing: border-box;
	  overflow: hidden;
		background-color: var(--background-color);
		z-index: 1;
		opacity: var(--header-opacity);
		border-bottom: var(--border-width) solid var(--separator-color);
	}

	:global(html) {
	  scroll-padding-top: var(--header-height);
	}

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--header-gap);
	}

	@media (min-width: 400px) {
		.header {
			flex-direction: row;
			justify-content: space-between;
			align-items: baseline;
		}
	}

	.name-link {
		text-decoration-line: none;
	}

	.name-link:hover {
		text-decoration-line: underline;
	}

	.name {
	  font-size: var(--font-size-xl);
		font-weight: normal;
		margin-block-end: 0;
	}

	@media (min-width: 400px) {
		.name {
			margin-block-end: revert;
		}
	}

	.navigation {
		display: flex;
		gap: var(--nav-gap);
		padding-inline-start: 0;
		margin-block-start: 0;
	}

	@media (min-width: 400px) {
		.navigation {
			margin-block-start: revert;
		}
	}

	.content {
	  margin-block-end: var(--spacing-base);
	}
</style>
