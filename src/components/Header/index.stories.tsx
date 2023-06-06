import React from 'react';

import newLogo from './amazeeio.svg';
import Header from './index';

export default {
  component: Header,
  title: 'Components/Header',
  tags: ['autodocs'],
};

export const Default = () => <Header logo={undefined} />;

/**
 * 
 *  If the <code>LAGOON\\_UI\\_ICON</code> environment variable
        is set to a URL-encoded SVG, it will be used instead of the default
        Lagoon logo.
 */
export const OverriddenLogo = () => <Header logo={newLogo} />;
