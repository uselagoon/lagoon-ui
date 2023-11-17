import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/projects',
    query: { organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/projects`,
});

/**
 * Links to the projects page given the project name and the openshift project name.
 */
const OrgProjectsLink = ({ organizationSlug, organizationId, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default OrgProjectsLink;
