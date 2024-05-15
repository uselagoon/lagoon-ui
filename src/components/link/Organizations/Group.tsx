import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (
  groupSlug: string,
  organizationSlug: string,
  organizationId: number,
  orgFriendlyName?: string
) => ({
  urlObject: {
    pathname: '/organizations/group',
    query: {
      groupName: groupSlug,
      organizationSlug,
      organizationId,
      ...(orgFriendlyName && { orgFriendlyName }),
    },
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
  orgFriendlyName = '',
}) => {
  const linkData = getLinkData(groupSlug, organizationSlug, organizationId, orgFriendlyName);

  const linkProps = className ? { className } : {};

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} {...linkProps}>
      {children}
    </Link>
  );
};

export default GroupLink;
