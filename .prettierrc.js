module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
  bracketSpacing: true,
  printWidth: 120,
  arrowParens: 'avoid',
  tabWidth: 2,
  importOrder: ['^react(.*)$', '^next(.*)$', '<THIRD_PARTY_MODULES>', '^src/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  trailingComma: 'es5',
};
