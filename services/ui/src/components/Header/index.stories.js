import React from 'react';
import Header from './index';
import newLogo from './amazeeio.svg';

export default {
  component: Header,
  title: 'Components/Header',
  parameters: {
    layout: 'fullscreen',
  }
}

export const Default = () => (
  <Header logo={newLogo} />
);
Default.story = {
  parameters: {
    docs: {
      storyDescription: `If the <code>LAGOON\\_UI\\_ICON</code> environment variable
        is set to a URL-encoded SVG, it will be used instead of the default
        Lagoon logo.`,
    },
  },
};