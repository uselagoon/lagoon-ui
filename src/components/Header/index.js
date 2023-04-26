import React from 'react';

import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';

import lagoonLogo from '!svg-inline-loader?classPrefix!./lagoon.svg';
import HeaderMenu from 'components/HeaderMenu';
import { AuthContext } from 'lib/Authenticator';
import useTranslation from 'lib/useTranslation';

import TourControlBtn from '../../tours/TourControlBtn';
import { StyledHeader } from './StyledHeader';

const { publicRuntimeConfig } = getConfig();

/**
 * Displays the header using the provided logo.
 */
const Header = ({ logo }) => {
  const t = useTranslation();
  return (
    <StyledHeader>
      <Link href="/">
        <a className="home">
          <Image
            alt="Home"
            width={75}
            height={28}
            layout="fixed"
            src={
              logo
                ? logo
                : `data:image/svg+xml;utf8,${
                    publicRuntimeConfig.LAGOON_UI_ICON
                      ? publicRuntimeConfig.LAGOON_UI_ICON
                      : encodeURIComponent(lagoonLogo)
                  }`
            }
          />
        </a>
      </Link>
      <TourControlBtn />
      <AuthContext.Consumer>
        {auth => {
          if (auth.authenticated) {
            return (
              <div className="authContainer">
                <Link href="/alldeployments" prefetch>
                  <a className="navitem">{t('header.nav.allDeployments')}</a>
                </Link>
                <HeaderMenu auth={auth}></HeaderMenu>
              </div>
            );
          }

          return null;
        }}
      </AuthContext.Consumer>
    </StyledHeader>
  );
};

export default Header;
