module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    emcaVersion: 2023,
    sourceType: 'module',
    emcaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
};
