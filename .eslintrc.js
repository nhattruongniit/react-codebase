module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  extends: ['airbnb'],
  parser: 'babel-eslint',
  globals: {
    document: true,
    window: true,
  },
  rules: {
    no_underscore_dangle: 0,
    strict: 0,
    'no-unused-vars': 1,
    'no-nested-ternary': 0,
    'no-console': 0,
    'no-shadow': 0,
    'object-curly-newline': 0,
    'global-require': 0,
    'new-cap': 0,
    'function-paren-newline': 0,
    'guard-for-in': 0,
    'max-len': 0,
    'class-methods-use-this': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/label-has-for': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/imports-first': 0,
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
};
