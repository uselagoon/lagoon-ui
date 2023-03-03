import React from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
import { StyledFooter } from "./StyledFooter";

const Footer = () => (
  <StyledFooter>
    <span className="version">
      Lagoon {`${publicRuntimeConfig.LAGOON_VERSION}`}
    </span>
  </StyledFooter>
);

export default Footer;
