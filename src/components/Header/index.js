import React from 'react';

import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';

import lagoonLogo from '!svg-inline-loader?classPrefix!./lagoon.svg';
import HeaderMenu from 'components/HeaderMenu';
import { AuthContext } from 'lib/Authenticator';

import TourControlBtn from '../../tours/TourControlBtn';
import { ControlButtons, StyledHeader } from './StyledHeader';
import ThemeToggler from './ThemeToggler';

const { publicRuntimeConfig } = getConfig();

/**
 * Displays the header using the provided logo.
 */
const Header = ({ logo }) => {
  const { asPath } = useRouter();

  const isOrganizationsPath = asPath.includes('/organizations');  

  return (
    <StyledHeader isOrganizationsPath={isOrganizationsPath}>
      <Link href="/">
        <a className="home">
          <img
            alt="Home"
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
      <ControlButtons>
        <TourControlBtn />
        <ThemeToggler />
      </ControlButtons>
      <AuthContext.Consumer>
        {auth => {
          if (auth.authenticated) {
            return (
              <div className="authContainer">
                <Link href="/alldeployments" prefetch>
                  <a className="navitem">Deployments</a>
                </Link>
                <HeaderMenu isOrganizationsPath={isOrganizationsPath} auth={auth}></HeaderMenu>
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
