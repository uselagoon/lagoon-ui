import Link from 'next/link';

export const getLinkData = (projectGroupSlug, organizationSlug, organizationId) => ({
  urlObject: {
    pathname: '/organizations/project',
    query: { projectName: projectGroupSlug, organizationSlug, organizationId },
  },
  asPath: `/organizations/${organizationSlug}/projects/${projectGroupSlug}`,
});

/**
 * Links to the project group page given the project name and the openshift project name.
 */
const ProjectGroupLink = ({
  projectGroupSlug,
  organizationSlug,
  organizationId,
  children,
  className = '',
  prefetch = false,
}) => {
  const linkData = getLinkData(projectGroupSlug, organizationSlug, organizationId);

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default ProjectGroupLink;
