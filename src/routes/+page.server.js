import { render } from "$lib/server/markdown";
import home from "$lib/server/resources/writings/home.md?raw";
import * as client from "$lib/server";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    [client.KEY_DATA_HOME_CONTENT]: (await render(home)).html,
  };
}
