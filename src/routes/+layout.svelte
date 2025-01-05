<script>
  import "../style/cssremedy.css";
  import {
    PUBLIC_SOCIAL_EMAIL_ADDRESS,
    PUBLIC_SOCIAL_GITHUB_URL
   } from "$env/static/public";

	let { children } = $props();
</script>

<div id="root">
  <header class="container">
    <h1>Kyle Erhabor</h1>
    <nav>
      <ul id="navigation">
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/titles">Titles</a>
        </li>
        /
        <li>
          <a href="mailto:{PUBLIC_SOCIAL_EMAIL_ADDRESS}">Email</a>
        </li>
        <li>
          <a href={PUBLIC_SOCIAL_GITHUB_URL} target="_blank">GitHub</a>
        </li>
      </ul>
    </nav>
  </header>
  <div id="divider"></div>
  <main class="container">
    {@render children()}
  </main>
</div>

<style>
  :root {
    color-scheme: light dark;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  #root {
    padding-block: 16px;
  }

  .container {
    max-width: 800px; /* 768 - 832 */
    margin: auto;
    padding-inline: 16px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  #divider {
    border-bottom: 1.5px dotted dimgray;
  }

  #navigation {
    display: flex;
    gap: 6px;
  }
</style>
