import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationId) => ({
  urlObject: {
    pathname: `/organizations/notifications`,
    query: { organizationSlug: organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/notifications`,
});

/**
 * Links to the notifications page given the project name and the openshift project name.
 */
const OrgNotificationsLink = ({ organizationSlug, organizationId, children, className = null, prefetch = false }) => {
  const linkData = getLinkData(organizationSlug, organizationId);
  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default OrgNotificationsLink;
