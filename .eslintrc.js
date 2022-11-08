module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
  },
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'max-len': ['error', { code: 120, ignoreStrings: true }],
    'comma-spacing': ['error', { before: false, after: true }]
  }
}
