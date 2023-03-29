import React from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { AuthContext } from 'lib/Authenticator';
import lagoonLogo from '!svg-inline-loader?classPrefix!./lagoon.svg';
import HeaderMenu from 'components/HeaderMenu';
import {StyledHeader} from "./StyledHeader";

const { publicRuntimeConfig } = getConfig();

/**
 * Displays the header using the provided logo.
 */
const Header = ({ logo }) => (
  <StyledHeader>
    <Link href="/">
      <a className="home">
	  <img
          alt="Home"
          src={logo ? logo : `data:image/svg+xml;utf8,${
            publicRuntimeConfig.LAGOON_UI_ICON
              ? publicRuntimeConfig.LAGOON_UI_ICON
              : encodeURIComponent(lagoonLogo)
          }`}
        />
      </a>
    </Link>
    <AuthContext.Consumer>
      {auth => {
        if (auth.authenticated) {
          return (
            <div className="authContainer">
              <a className="navitem" href="/alldeployments">Deployments</a>
              <HeaderMenu auth={auth}></HeaderMenu>
            </div>
          );
        }

        return null;
      }}
    </AuthContext.Consumer>
  </StyledHeader>
);

export default Header;