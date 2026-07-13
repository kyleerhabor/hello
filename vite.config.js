import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const config = {
    plugins: [
      sveltekit(),
      paraglideVitePlugin({ project: "./project.inlang", outdir: "./src/lib/paraglide" }),
      devtoolsJson(),
    ],
    server: {
      allowedHosts: env.ALLOWED_HOSTS?.split(",") ?? [],
    },
  };

  return config;
});
