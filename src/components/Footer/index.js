import React from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { StyledFooter } from "./StyledFooter";
import LanguageSwitcher from "./LanguageSwitcher";

const Footer = () => (
  <StyledFooter>
    <span className="version">
      Lagoon {`${publicRuntimeConfig.LAGOON_VERSION}`}
    </span>
    <LanguageSwitcher />
  </StyledFooter>
);

export default Footer;
