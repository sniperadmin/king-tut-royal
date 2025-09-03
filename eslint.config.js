import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";

export default defineConfigWithVueTs(
  { ignores: ["dist"] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueTsConfigs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
