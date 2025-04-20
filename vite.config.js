import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [
    sveltekit({
      dynamicCompileOptions({ filename, compileOptions }) {
        // https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#dynamiccompileoptions
        //
        // Do they expect us to define forceRunesMode?
        if (forceRunesMode(filename) && !compileOptions.runes) {
          return { runes: true };
        }
      },
    }),
  ],
});
