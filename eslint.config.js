// @ts-expect-error missing types
import shuunen from 'eslint-plugin-shuunen'

export default [
  ...shuunen.configs.base,
  ...shuunen.configs.browser,
  {
    name: 'project-overrides',
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'no-console': 'off',
      'no-magic-numbers': 'off',
    },
  },
]
