import { create } from '@storybook/theming';

import logo from './public/logo.svg';

export default create({
  base: 'dark',
  brandTitle: 'Lagoon',
  brandUrl: 'http://lagoon.sh/',
  brandImage: logo,
  brandTarget: '_blank',
});
