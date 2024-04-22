import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number) => ({
  urlObject: {
    pathname: `/organizations/notifications`,
    query: { organizationSlug: organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/notifications`,
});

/**
 * Links to the notifications page given the project name and the openshift project name.
 */
const OrgNotificationsLink: FC<ExtendableOrgLinkProps> = ({
  organizationSlug,
  organizationId,
  children,
  className = null,
  prefetch = false,
}) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  const linkProps = className ? { className } : {};
  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} {...linkProps}>
      {children}
    </Link>
  );
};

export default OrgNotificationsLink;
