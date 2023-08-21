import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationName) => ({
  urlObject: {
    pathname: '/organizations/notifications',
    query: { organizationSlug: organizationSlug, organizationName: organizationName }
  },
  asPath: `/organizations/${organizationSlug}/notifications`
});

/**
 * Links to the group page given the project name and the openshift project name.
 */
const OrgNotificationsLink = ({
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

export default OrgNotificationsLink;
