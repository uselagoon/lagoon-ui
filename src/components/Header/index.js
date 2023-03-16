import React from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { AuthContext } from 'lib/Authenticator';
import lagoonLogo from '!svg-inline-loader?classPrefix!./lagoon.svg';
import HeaderMenu from 'components/HeaderMenu';
import {StyledHeader} from "./StyledHeader";
import Image from 'next/image';

const { publicRuntimeConfig } = getConfig();

/**
 * Displays the header using the provided logo.
 */
const Header = ({ logo }) => (
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
    <AuthContext.Consumer>
      {(auth) => {
        if (auth.authenticated) {
          return (
            <div className="authContainer">
              <Link href="/alldeployments" prefetch>
                <a className="navitem">Deployments</a>
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

export default Header;