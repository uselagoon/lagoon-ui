import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number) => ({
  urlObject: {
    pathname: '/organizations/groups',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/groups`,
});

/**
 * Links to the groups page given the project name and the openshift project name.
 */
const GroupsLink: FC<ExtendableOrgLinkProps> = ({
  organizationSlug,
  organizationId,
  children,
  className = '',
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

export default GroupsLink;
