import { addons } from '@storybook/addons';

import LagoonTheme from './LagoonTheme';

addons.setConfig({
  theme: LagoonTheme,
  sidebar:{
    showRoots: false,
  }
});
