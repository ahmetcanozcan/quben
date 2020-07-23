module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'valid-typeof': 'warn',
    'no-console': 'error',
  },
};
