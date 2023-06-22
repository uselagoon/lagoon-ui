import React, { FC } from 'react';

import Router from 'next/router';

import { BreadCrumbLink, StyledBreadCrumb } from './StyledBreadCrumb';

interface BreadcrumbProps {
  header: string;
  title: string;
  urlObject: {
    pathname: string;
    query: {
      [key: string]: string;
    };
  };
  asPath: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ header, title, urlObject, asPath }) => (
  <>
    <BreadCrumbLink
      href={asPath}
      onClick={e => {
        e.preventDefault();
        void Router.push(urlObject, asPath);
      }}
    >
      <StyledBreadCrumb className="breadcrumb">
        <div>
          <label>{header}</label>
          <h2>{title}</h2>
        </div>
      </StyledBreadCrumb>
    </BreadCrumbLink>
  </>
);

export default Breadcrumb;
