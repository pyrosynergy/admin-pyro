import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { react },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      /*
       * Catches a component used in JSX that was never imported — the failure
       * that took production down after PR #15, where a merge kept the old
       * import block alongside the new render body and left nine components
       * undeclared.
       *
       * `no-undef` does NOT cover this: it inspects Identifier nodes, and a
       * JSX component reference parses as a JSXIdentifier. `vite build` does
       * not either — Rollup can't distinguish an undefined identifier from a
       * browser global, so it emits no warning. Without this rule the mistake
       * builds clean and only fails once the component tries to render.
       *
       * Only this one rule is enabled from eslint-plugin-react; the plugin's
       * recommended set flags a lot of pre-existing style issues that are not
       * what this guard is for.
       */
      'react/jsx-no-undef': 'error',
    },
  },
])
