import eslintPluginSvelte from "eslint-plugin-svelte";
import stylistic from "@stylistic/eslint-plugin";

export default [
  // add more generic rule sets here, such as:
  ...eslintPluginSvelte.configs["flat/recommended"],
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/semi": ["error"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double", { avoidEscape: false }],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
    },
  },
];
