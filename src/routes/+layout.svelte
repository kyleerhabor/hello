<script>
  import "../style/cssremedy.css";
  import {
    PUBLIC_SOCIAL_EMAIL_ADDRESS,
    PUBLIC_SOCIAL_GITHUB_URL
   } from "$env/static/public";

	let { children } = $props();
</script>

<div class="root">
  <header class="container">
    <h1 class="name">Kyle Erhabor</h1>
    <nav>
      <ul class="navigation">
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/series">Series Recs.</a>
        </li>
        |
        <li>
          <a href="mailto:{PUBLIC_SOCIAL_EMAIL_ADDRESS}">Email</a>
        </li>
        <li>
          <a href={PUBLIC_SOCIAL_GITHUB_URL} target="_blank">GitHub</a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="divider"></div>
  <main class="container">
    {@render children()}
  </main>
</div>

<style>
  :root {
    --container-inset: 16px;
    color-scheme: light dark;
    font-family: system-ui, sans-serif;
    font-weight: normal;
  }

  .root {
    padding-block: var(--container-inset);
  }

  .container {
    max-width: 800px; /* 768 - 832 */
    margin: auto;
    padding-inline: var(--container-inset);
  }

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 550px) {
    header {
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
    }
  }

  nav {
    margin-block: 4px;
  }

  .navigation {
    display: flex;
    gap: 6px;
    margin-block: 0;
    padding-inline-start: 0;
  }

  .divider {
    border-bottom: 1.5px dotted dimgray;
    margin-block-start: var(--container-inset);
  }
</style>
