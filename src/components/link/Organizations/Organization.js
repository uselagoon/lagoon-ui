import Link from 'next/link';

export const getLinkData = (organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/organization',
    query: { organizationSlug , organizationId },
  },
  asPath: `/organizations/${organizationSlug}`,
});

/**
 * Links to the organization page given the organization name.
 */
const OrganizationLink = ({ organizationSlug, organizationId, children, className = '', prefetch = false }) => {
  const linkData = getLinkData(organizationSlug, organizationId);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default OrganizationLink;
