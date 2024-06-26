import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number, orgFriendlyName: string) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { organizationSlug, organizationId, orgFriendlyName },
  },
  asPath: `/organizations/${organizationSlug}/users`,
});

/**
 * Links to the users page given the organization name.
 */
const UsersLink: FC<ExtendableOrgLinkProps> = ({
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

export default UsersLink;
