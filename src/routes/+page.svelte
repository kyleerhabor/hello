<script>
  import ExternalLink from "./ExternalLink.svelte";
  import { page } from "$app/state";
  import {
    PUBLIC_PROJECT_ADVANCE_URL,
    PUBLIC_PROJECT_SAMPLED_URL,
  } from "$env/static/public";

  const origin = $derived(page.url.origin);
</script>

<svelte:head>
  <title>Kyle Erhabor</title>
</svelte:head>

<p>Hi!</p>
<p>
  I'm Kyle Erhabor, a software developer studying Computer Science at Suffolk University in Boston, MA. I spend my days
  studying and developing software as a passion.
</p>
<p>
   My current interest is in application development for Apple's Darwin platform, its macOS and iOS operating systems,
   and in Swift programming for interfacing with system application programming interfaces (APIs). Some notable works of
   mine are the <ExternalLink href={PUBLIC_PROJECT_ADVANCE_URL} url={origin}>Advance</ExternalLink> image viewer app and
   the <ExternalLink href={PUBLIC_PROJECT_SAMPLED_URL} url={origin}>Sampled</ExternalLink> music player app.
</p>
<p>
  If you'd like to reach me, the best way is to send me an email. I enjoy reading them and will try to respond in a
  timely manner.
</p>
