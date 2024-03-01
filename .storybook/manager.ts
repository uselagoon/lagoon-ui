import { addons } from '@storybook/addons';

import LagoonTheme from './lagoonTheme';

addons.setConfig({
  theme: LagoonTheme,
  sidebar: {
    showRoots: false,
  },
});
