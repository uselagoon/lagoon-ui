import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (groupSlug: string, organizationSlug: string, organizationId: number) => ({
  urlObject: {
    pathname: '/organizations/group',
    query: { groupName: groupSlug, organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/groups/${groupSlug}`,
});

/**
 * Links to the group page given the project name and the openshift project name.
 */

interface GroupLinkProps extends ExtendableOrgLinkProps {
  groupSlug: string;
}

const GroupLink: FC<GroupLinkProps> = ({
  groupSlug,
  organizationSlug,
  organizationId,
  children,
  className = null,
  prefetch = false,
}) => {
  const linkData = getLinkData(groupSlug, organizationSlug, organizationId);

  const linkProps = className ? { className } : {};

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a {...linkProps}>{children}</a>
    </Link>
  );
};

export default GroupLink;
