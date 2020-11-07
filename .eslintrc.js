const rules = require('./.eslintrc.rules')

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: [
    'html',
    'unicorn',
  ],
  rules,
}
