<script>
  import "../app.css";
  import "../style/main.css";
  import "../style/cssremedy.css";
  import {
    PUBLIC_SOCIAL_EMAIL_ADDRESS,
    PUBLIC_SOCIAL_GITHUB_URL,
    PUBLIC_GIVEN_NAME,
    PUBLIC_FAMILY_NAME,
  } from "$env/static/public";

	let { children } = $props();
</script>

<div class="header-parent">
  <header class="header container">
    <a class="name-link" href="/">
      <h1 class="name">
        <b class="given-name">{PUBLIC_GIVEN_NAME}</b>
        {PUBLIC_FAMILY_NAME}
      </h1>
    </a>
    <nav>
      <ul class="navigation">
        <li>
          <a href="/series">Series Recs.</a>
        </li>
        <li>|</li>
        <li>
          <a href="mailto:{PUBLIC_SOCIAL_EMAIL_ADDRESS}">Email</a>
        </li>
        <li>
          <a href={PUBLIC_SOCIAL_GITHUB_URL} target="_blank">GitHub</a>
        </li>
      </ul>
    </nav>
  </header>
</div>
<main class="container">
  {@render children()}
</main>

<style>
  :root {
    color-scheme: light dark;
    background-color: var(--background-color);
    /* https://github.com/system-fonts/modern-font-stacks#system-ui */
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
    gap: 4px; /* 0 - 5 */
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
  }

  .given-name {
    font-weight: 800;
  }

  .navigation {
    display: flex;
    gap: 6px; /* 5 - 10 */
    margin-block: 0;
    padding-inline-start: 0;
  }
</style>
