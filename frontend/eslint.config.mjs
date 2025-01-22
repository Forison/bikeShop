import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Remove semicolons
      'semi': ['error', 'never'],
      // Use double quotes instead of single quotes
      'quotes': ['error', 'single'],
      // Set tab width to 2 spaces
      'indent': ['error', 2],
      // Set max line length to 120 characters
      'max-len': ['error', { code: 120 }],
    },
  },
];