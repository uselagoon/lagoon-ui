import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import Router from 'next/router';

import { BreadCrumbLink, StyledBreadCrumb } from './StyledBreadCrumb';

interface BreadcrumbProps {
  header: string;
  title: string;
  urlObject: {
    pathname: string;
    query: {
      [key: string]: string | number;
    };
  };
  asPath: string;
  loading?: boolean;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ header, title, urlObject, asPath, loading }) => (
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
          {title ? <h2>{title}</h2> : loading && <Skeleton width={150} />}
        </div>
      </StyledBreadCrumb>
    </BreadCrumbLink>
  </>
);

export default Breadcrumb;
