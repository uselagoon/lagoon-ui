import React from 'react';

import getConfig from 'next/config';

import { StyledFooter } from './StyledFooter';

const { publicRuntimeConfig } = getConfig();

const Footer = () => (
  <StyledFooter>
    <span className="version">Lagoon {`${publicRuntimeConfig.LAGOON_VERSION}`}</span>
  </StyledFooter>
);

export default Footer;
