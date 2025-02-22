import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string) => ({
  urlObject: {
    pathname: '/organizations/variables',
    query: { organizationSlug },
  },
  asPath: `/organizations/${organizationSlug}/variables`,
});

/**
 * Links to the org variables page given the organization name.
 */
const OrgVariablesLink: FC<ExtendableOrgLinkProps> = ({
  organizationSlug,
  children,
  className = '',
  prefetch = false,
}) => {
  const linkData = getLinkData(organizationSlug);

  const linkProps = className ? { className } : {};

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} {...linkProps}>
      {children}
    </Link>
  );
};

export default OrgVariablesLink;
