import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/manage',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/manage`,
});

/**
 * Links to the manage page given the project name and the openshift project name.
 */
const OrgManageLink = ({ organizationSlug, organizationId, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(organizationSlug, organizationId);
  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default OrgManageLink;
