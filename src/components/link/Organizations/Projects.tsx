import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number, orgFriendlyName: string) => ({
  urlObject: {
    pathname: '/organizations/projects',
    query: { organizationSlug, organizationId, orgFriendlyName },
  },
  asPath: `/organizations/${organizationSlug}/projects`,
});

/**
 * Links to the projects page given the project name and the openshift project name.
 */
const OrgProjectsLink: FC<ExtendableOrgLinkProps> = ({
  organizationSlug,
  organizationId,
  children,
  className = '',
  prefetch = false,
  orgFriendlyName = '',
}) => {
  const linkData = getLinkData(organizationSlug, organizationId, orgFriendlyName);

  const linkProps = className ? { className } : {};

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} {...linkProps}>
      {children}
    </Link>
  );
};

export default OrgProjectsLink;
