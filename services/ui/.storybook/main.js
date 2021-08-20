const webpackShared = require('../src/webpack.shared-config');
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
    '@storybook/addon-postcss',
    'storybook-addon-apollo-client',
  ],
  webpackFinal: async (config, { isServer }) => {
    // Add aliases from shared config file.
    Object.keys(webpackShared.alias).forEach(name => config.resolve.alias[name] = webpackShared.alias[name]);
    // Add alias for storybook decorators and components.
    config.resolve.alias.storybook = __dirname;

    // Add reference to api mock data    
    config.resolve.alias.api = path.join(__dirname, '../../', 'api'),

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
    //console.dir(config, { depth: null });

    return config
  },
}