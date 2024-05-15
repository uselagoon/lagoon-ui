import { FC } from 'react';

import Link from 'next/link';

import { ExtendableOrgLinkProps } from './commons';

export const getLinkData = (
  projectGroupSlug: string,
  organizationSlug: string,
  organizationId: number,
  orgFriendlyName: string
) => ({
  urlObject: {
    pathname: '/organizations/project',
    query: { projectName: projectGroupSlug, organizationSlug, organizationId, orgFriendlyName },
  },
  asPath: `/organizations/${organizationSlug}/projects/${projectGroupSlug}`,
});

interface ProjectGroupLinkProps extends ExtendableOrgLinkProps {
  projectGroupSlug: string;
  orgFriendlyName?: string;
}

/**
 * Links to the project group page given the project name and the openshift project name.
 */
const ProjectGroupLink: FC<ProjectGroupLinkProps> = ({
  projectGroupSlug,
  organizationSlug,
  organizationId,
  children,
  className = '',
  prefetch = false,
  orgFriendlyName = '',
}) => {
  const linkData = getLinkData(projectGroupSlug, organizationSlug, organizationId, orgFriendlyName);

  const linkProps = className ? { className } : {};

  return (
    <Link href={linkData.urlObject} as={linkData.asPath} prefetch={prefetch} {...linkProps}>
      {children}
    </Link>
  );
};

export default ProjectGroupLink;
