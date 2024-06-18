// @ts-nocheck
const perfectionistNatural = require('eslint-plugin-perfectionist/configs/recommended-natural')
const unicorn = require('eslint-plugin-unicorn')
const eslint = require("@eslint/js")
const globals = require('globals')

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = [
  {
    ignores: ['node_modules/*', 'coverage/*', 'build/*', 'dist/*', 'static/*'],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    }
  },
  perfectionistNatural,
  unicorn.configs['flat/all'],
  {
    rules: {
      'unicorn/prefer-module': 'off', // we use require
      'unicorn/prefer-string-replace-all': 'off', // not well supported
    },
  },
  {
    rules: {
      'perfectionist/sort-imports': 'off', // not needed, vscode & biome does this
    },
  },
]
