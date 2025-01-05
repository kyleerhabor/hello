<script>
  import { ExternalLink } from "lucide-svelte";
  import "../style/main.css";

  const { isLocal, children } = $props();
</script>

<span class="link">
  <span>
    {@render children()}
  </span>
  <span class:hide={isLocal}>
    <ExternalLink size="14px" />
  </span>
</span>

<style>
  .link {
    display: inline flex;
    gap: 2px;
    align-items: baseline;
  }
</style>
