import Link from 'next/link';

export const getLinkData = (groupSlug, organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/group',
    query: { groupName: groupSlug, organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/groups/${groupSlug}`,
});

/**
 * Links to the group page given the project name and the openshift project name.
 */
const GroupLink = ({ groupSlug, organizationSlug, organizationId, children, className = null, prefetch = false }) => {
  const linkData = getLinkData(groupSlug, organizationSlug, organizationId);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default GroupLink;
