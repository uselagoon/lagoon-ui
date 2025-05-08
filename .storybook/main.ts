import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/jest',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: async () => ({
          implementation: (await import('sass')).default,
        }),
      },
    },
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, './next.mock-config.js'),
    },
  },

  // rewrite for component images
  staticDirs: ['./public', '../public', { from: '../src/static', to: 'static/' }],

  docs: {},

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
