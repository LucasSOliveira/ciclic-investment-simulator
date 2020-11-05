module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    indent: [ 'error', 2 ],
    'space-before-blocks': 'error',
    'keyword-spacing': [ 'error', { after: true }],
    'space-infix-ops': 'error',
    'no-extra-parens': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-semi': 'error',
    'max-len': ["warn", { code: 300 }],
    'no-else-return': 'error',
    'no-multi-spaces': 'error',
    'no-unused-expressions': ["off", { "allowTernary": true }],
    'no-useless-return': 'error',
    'eol-last': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'brace-style': [ 'error', '1tbs', { allowSingleLine: true }],
    'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: false }],
    eqeqeq:'off',
    indent: 'off',
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
