module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // 不一定要加逗號
    'comma-dangle': [
      'error',
      'only-multiline'
    ],
    curly: [
      'error',
      'multi-line'
    ]
  }
}
