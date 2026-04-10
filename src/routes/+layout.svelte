<script>
	import { resolve } from "$app/paths";
	import { page } from "$app/state";
	import {
	  PUBLIC_NAME,
	  PUBLIC_SOCIAL_EMAIL_ADDRESS,
	  PUBLIC_SOCIAL_GITHUB_URL,
	} from "$env/static/public";
	import { locales, localizeHref } from "$lib/paraglide/runtime";
	import "../app.css";
	import "../style/cssremedy.css";
	import "../style/main.css";

	let { children } = $props();
</script>

<div class="header-parent">
	<header class="header container">
		<a class="name-link" href={resolve("/")}>
      <h1 class="name">
        {PUBLIC_NAME}
      </h1>
    </a>
		<nav>
			<ul class="navigation">
				<li>
          <a href={resolve("/series")}>
            Series Recs.
          </a>
        </li>
				<li>
          |
        </li>
				<li>
          <a href="mailto:{PUBLIC_SOCIAL_EMAIL_ADDRESS}">
            Email
          </a>
        </li>
				<li>
					<a href={PUBLIC_SOCIAL_GITHUB_URL} rel="external" target="_blank">
            GitHub
          </a>
				</li>
			</ul>
		</nav>
	</header>
</div>
<main class="container">
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
		max-width: 800px;
		margin: auto;
		padding-inline: 16px;
	}

	.header-parent {
		position: sticky;
		top: 0;
		background-color: var(--background-color);
		z-index: 1;
		opacity: 0.95;
		border-bottom: 1px solid var(--header-divider-color);
	}

	.header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 8px;
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
		font-size: 1.25em;
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
		gap: 6px;
		padding-inline-start: 0;
		margin-block-start: 0;
	}

	@media (min-width: 400px) {
		.navigation {
			margin-block-start: revert;
		}
	}
</style>
