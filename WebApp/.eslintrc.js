module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2017,
    ecmaFeatures: {
      legacyDecorators: true
    },
    sourceType: 'module'
  },
  extends: ['plugin:vue/essential'],
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/comment-directive': 'off',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ]
  }
};
