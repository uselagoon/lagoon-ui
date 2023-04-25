import React from 'react';

import { StyledBreadcrumbsWrapper } from './StyledBreadCrumb';

/**
 * Displays the Project and, optionally, the Environment breadcrumbs.
 */
const Breadcrumbs = ({ children }: { children: JSX.Element[] }) => (
  <StyledBreadcrumbsWrapper className="breadcrumbs-wrapper">
    <div className="breadcrumbs">{children}</div>
  </StyledBreadcrumbsWrapper>
);

export default Breadcrumbs;
