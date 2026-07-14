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
	let isHeaderHidden = $state(false);
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

	const SCROLL_THRESHOLD = 80;
	$effect(() => {
	  let lastScroll = 0;
	  const onScroll = () => {
	    const scroll = window.scrollY;
	    const delta = scroll - lastScroll;
	    lastScroll = scroll;

	    if (isHeaderHidden && delta < -5) {
	      // Was hidden, scrolling up by more than 5px
	      isHeaderHidden = false;
	    } else if (!isHeaderHidden && delta > 5 && scroll > SCROLL_THRESHOLD) {
	      // Was visible, scrolling down by more than 5px and past threshold
	      isHeaderHidden = true;
	    }
	  };

	  window.addEventListener("scroll", onScroll, { passive: true });

	  return () => window.removeEventListener("scroll", onScroll);
	});
</script>

<div class="header-parent" class:header-parent-hidden={isHeaderHidden}>
	<header class="container header">
		<a class="name-link" href={resolve("/")}>
      <h1 class="name">
        {PUBLIC_NAME}
      </h1>
    </a>
		<nav>
			<ul class="navigation">
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
		background-color: var(--background-color);
		color-scheme: light dark;
		font-family: system-ui, sans-serif;
		font-weight: normal;
	}

	.container {
    margin: auto;
    max-width: var(--page-max-width);
    padding-inline: var(--page-padding-inline);
	}

	.header-parent {
		background-color: var(--background-color);
		border-bottom: var(--border-width) solid var(--separator-color);
		min-height: var(--header-height);
		opacity: var(--header-opacity);
	  overflow: hidden;
		position: sticky;
		top: 0;
		transition: transform 0.3s ease;
		z-index: 1;
	}

	.header-parent-hidden {
    transform: translateY(-100%);
  }

	:global(html) {
	  scroll-padding-top: var(--header-height);
	}

	.header {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: var(--header-gap);
		justify-content: center;
	}

	@media (min-width: 400px) {
	  .header-parent-hidden {
      transform: none;
    }

		.header {
			align-items: baseline;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.name-link {
		text-decoration-line: none;
	}

	.name-link:hover {
		text-decoration-line: underline;
	}

	.name {
		margin-block-end: 0;
		font-weight: normal;
	  font-size: var(--font-size-xl);
	}

	@media (min-width: 400px) {
		.name {
			margin-block-end: revert;
		}
	}

	.navigation {
		display: flex;
		gap: var(--nav-gap);
		margin-block-start: 0;
		padding-inline-start: 0;
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
