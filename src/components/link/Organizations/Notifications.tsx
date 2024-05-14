import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number, orgFriendlyName: string) => ({
  urlObject: {
    pathname: `/organizations/notifications`,
    query: { organizationSlug: organizationSlug, organizationId, orgFriendlyName },
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
  orgFriendlyName = '',
}) => {
  const linkData = getLinkData(organizationSlug, organizationId, orgFriendlyName);

  const linkProps = className ? { className } : {};
  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a {...linkProps}>{children}</a>
    </Link>
  );
};

export default OrgNotificationsLink;
