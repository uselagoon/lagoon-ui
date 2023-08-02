import Link from 'next/link';

export const getLinkData = (userSlug, organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/user',
    query: { userSlug, organizationSlug: organizationSlug, organizationName: organizationName }
  },
  asPath: `/organizations/${organizationSlug}/users/${userSlug}`
});

/**
 * Links to a user page.
 */
const UserLink = ({
  userSlug,
  organizationSlug,
  organizationName,
  children,
  className = '',
  prefetch = false
}) => {

  const linkData = getLinkData(userSlug, organizationSlug, organizationName);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default UserLink;
