import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig({
  plugins: [
    sveltekit({
      dynamicCompileOptions({ filename, compileOptions }) {
        // https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#dynamiccompileoptions
        if (forceRunesMode(filename) && !compileOptions.runes) {
          return { runes: true };
        }
      },
    }),
    devtoolsJson(),
  ],
});
