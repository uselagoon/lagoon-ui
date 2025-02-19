import React, { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Skeleton from 'react-loading-skeleton';

import Router from 'next/router';

import { BreadCrumbLink, StyledBreadCrumb, StyledCopyWrapper } from './StyledBreadCrumb';

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
const Breadcrumb: FC<BreadcrumbProps> = ({ header, title, urlObject, asPath, loading }) => {
  const [copied, setCopied] = useState(false);

  return (
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
      <StyledCopyWrapper>
        <div className="copy-field">
          <span className="copied" style={copied ? { top: '-20px', opacity: '0' } : {}}>
            Copied
          </span>
          <CopyToClipboard
            data-cy="copyButton"
            text={title}
            onCopy={() => {
              setCopied(true);
              setTimeout(function () {
                setCopied(false);
              }, 750);
            }}
          >
            <span className="copy" />
          </CopyToClipboard>
        </div>
      </StyledCopyWrapper>
    </>
  );
};

export default Breadcrumb;
