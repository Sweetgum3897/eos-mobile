// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // Convert specific warnings to errors
    'no-warning-comments': ['warn', { terms: ['fixme', 'todo'], location: 'start' }],

    // Allow console statements
    'no-console': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@next/next/no-img-element': 'off',

    // Additional rules can be added here
    'import/no-extraneous-dependencies': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
