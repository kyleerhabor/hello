<script>
  import TextLink from "./TextLink.svelte";
  import {
    PUBLIC_NAME,
    PUBLIC_PROJECT_ADVANCE_URL,
    PUBLIC_PROJECT_SAMPLED_URL,
  } from "$env/static/public";
</script>

<svelte:head>
  <title>{PUBLIC_NAME}</title>
</svelte:head>

<!-- TODO: Figure out how to use AsciiDoc -->
<p>
  Hi!
</p>
<p>
  I'm Kyle Erhabor, a software developer studying Computer Science at Suffolk University in Boston, MA. I spend my days
  studying and developing software.
</p>
<p>
  My current interests are in application development and systems programming for Apple's Darwin platform. Some notable
  works of mine are the <TextLink href="{PUBLIC_PROJECT_SAMPLED_URL}">Sampled</TextLink> music player app and
  <TextLink href="{PUBLIC_PROJECT_ADVANCE_URL}">Advance</TextLink> image viewer app.
</p>
<p>
  If you'd like to reach me, the best way is to send me an email. I enjoy reading them and will try to respond soon.
</p>
