
"use client";

import React, { ReactNode } from "react";
import { GlobalStyles, PageContainer, UIThemeProvider } from "@uselagoon/ui-library";
import AntdRegistry from "../lib/AntdRegistry";
import StyledComponentsRegistry from "../lib/StyledComponentsRegistry";
import Link from "next/link";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <StyledComponentsRegistry>
        <UIThemeProvider>
          <GlobalStyles />
          <PageContainer showHeader headerProps={{userInfo:{email: ""}, toggleTheme:()=>{}, navLinks:[<a>Home</a>, <a>Organizations</a>]}}> 
            {children}
          </PageContainer>
        </UIThemeProvider>
      </StyledComponentsRegistry>
    </AntdRegistry>
  );
};
export default AppProvider;