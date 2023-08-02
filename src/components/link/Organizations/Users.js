import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/users',
    query: { organizationSlug: organizationSlug, organizationName: organizationName }
  },
  asPath: `/organizations/${organizationSlug}/users`
});

/**
 * Links to the users page given the organisation name.
 */
const UsersLink = ({
  organizationSlug,
  organizationName,
  children,
  className = '',
  prefetch = false
}) => {

  const linkData = getLinkData(organizationSlug, organizationName);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default UsersLink;
