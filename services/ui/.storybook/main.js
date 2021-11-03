const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-postcss',
    'storybook-addon-apollo-client',
    'storybook-addon-next-router',
  ],
  webpackFinal: async (config, { isServer }) => {
    // const nextConfig = require('../next.config.js');

    const aliases = {
      storybook: __dirname,
      components: path.join(__dirname, '../', 'src', 'components'),
      layouts: path.join(__dirname, '../', 'src', 'layouts'),
      lib: path.join(__dirname, '../', 'src', 'lib'),
      pages: path.join(__dirname, '../', 'src', 'pages'),
      page_stories: path.join(__dirname, '../', 'src', 'page_stories'),
      styles: path.join(__dirname, '../', 'styles'),
      public: path.join(__dirname, '../', 'public'),
      mock_data: path.join(__dirname, '../../', 'mock-data')
    };
    Object.keys(aliases).forEach(name => config.resolve.alias[name] = aliases[name]);

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    // Debug config.
    // console.dir(config, { depth: null });

    return config
  },
}