import React from 'react';

import getConfig from 'next/config';

import LanguageSwitcher from './LanguageSwitcher';
import { StyledFooter } from './StyledFooter';

const { publicRuntimeConfig } = getConfig();

const Footer = () => (
  <StyledFooter>
    <span className="version">Lagoon {`${publicRuntimeConfig.LAGOON_VERSION}`}</span>
    <LanguageSwitcher />
  </StyledFooter>
);

export default Footer;
