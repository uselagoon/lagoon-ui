const path = require('path');
module.exports = {
  extends: ['next', 'plugin:storybook/recommended'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
  },
  ignorePatterns: ['src/**/*.stories.js'],

  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsConfigRootDir: path.resolve(__dirname),
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'next/core-web-vitals',
      ],
      rules: {
        '@typescript-eslint/no-unsafe-assessment': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/require-await': ['error'],
        '@typescript-eslint/no-unsafe-return': ['error'],
        '@typescript-eslint/no-unsafe-call': ['error'],
        '@typescript-eslint/no-unsafe-argument': ['error'],
        '@typescript-eslint/no-unsafe-member-access': ['error'],
        '@typescript-eslint/no-non-null-assertion': ['error'],
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-unused-vars': 'off',
        'require-await': 'off',
      },
    },
  ],
};
