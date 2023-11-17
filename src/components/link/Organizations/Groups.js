import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/groups',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/groups`,
});

/**
 * Links to the groups page given the project name and the openshift project name.
 */
const GroupsLink = ({ organizationSlug, organizationId, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default GroupsLink;
