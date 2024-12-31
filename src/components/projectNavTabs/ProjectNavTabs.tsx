'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import projectByNameQuery from '@/lib/query/projectByNameQuery';
import { useQuery } from '@apollo/client';
import { Tabs } from '@uselagoon/ui-library';

import { LinkContentWrapper } from '../shared/styles';

export const ProjectNavTabs = ({ children }: { children: ReactNode }) => {
  const { projectSlug, environmentSlug } = useParams<{ projectSlug: string; environmentSlug: string }>();

  const pathname = usePathname();

  const { data } = useQuery(projectByNameQuery, {
    variables: { name: projectSlug },
  });

  const showDeployTargets = data?.project?.deployTargetConfigs?.length > 0;

  // Do not nest multiple navTabs (project -> environment)
  if (environmentSlug) {
    return children;
  }
  return (
    <>
      <Tabs
        type="navigation"
        pathname={pathname}
        items={[
          {
            key: 'environments',
            label: (
              <Link href={`/projects/${projectSlug}`}>
                <LinkContentWrapper>Environments</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'project-details',
            label: (
              <Link href={`/projects/${projectSlug}/project-details`}>
                <LinkContentWrapper>Details</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'project-variables',
            label: (
              <Link href={`/projects/${projectSlug}/project-variables`}>
                <LinkContentWrapper>Variables</LinkContentWrapper>
              </Link>
            ),
          },

          ...(showDeployTargets
            ? [
                {
                  key: 'deploy-targets',
                  label: (
                    <Link href={`/projects/${projectSlug}/deploy-targets`}>
                      <LinkContentWrapper>Deploy Targets</LinkContentWrapper>
                    </Link>
                  ),
                },
              ]
            : []),
        ]}
      >
        {children}
      </Tabs>
    </>
  );
};

export default ProjectNavTabs;
