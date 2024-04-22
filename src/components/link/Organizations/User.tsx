import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (organizationSlug: string, organizationId: number) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/users`,
});

/**
 * Links to the users page given the project name and the openshift project name.
 */
const UsersLink: FC<ExtendableOrgLinkProps> = ({
  organizationSlug,
  organizationId,
  children,
  className = '',
  prefetch = false,
}) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  const linkProps = className ? { className } : {};

  return (
    <Link
      href={linkData.urlObject}
      as={linkData.asPath}
      prefetch={prefetch}
      style={{ textDecoration: 'underline' }}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default UsersLink;
