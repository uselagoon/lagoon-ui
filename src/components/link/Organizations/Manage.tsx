import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number) => ({
  urlObject: {
    pathname: '/organizations/manage',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/manage`,
});

/**
 * Links to the manage page given the project name and the openshift project name.
 */
const OrgManageLink: FC<ExtendableOrgLinkProps> = ({
  organizationSlug,
  organizationId,
  children,
  className = '',
  prefetch = false,
}) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  const linkProps = className ? { className } : {};
  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a {...linkProps}>{children}</a>
    </Link>
  );
};

export default OrgManageLink;
