import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/users`,
});

/**
 * Links to the users page given the organization name.
 */
const UsersLink = ({ organizationSlug, organizationId, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default UsersLink;
