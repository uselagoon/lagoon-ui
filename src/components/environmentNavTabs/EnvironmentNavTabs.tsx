'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import environmentWithProblems from '@/lib/query/environmentWithProblems';
import { useQuery } from '@apollo/client';
import { Colors, Tabs } from '@uselagoon/ui-library';

import { LinkContentWrapper } from '../shared/styles';
import { ProblemCount, ProblemCountSkeleton } from './styles';

const EnvironmentNavTabs = ({ children }: { children: ReactNode }) => {
  const { projectSlug, environmentSlug } = useParams<{ projectSlug: string; environmentSlug: string }>();

  const pathname = usePathname();

  const { loading, error, data } = useQuery(environmentWithProblems, {
    variables: { openshiftProjectName: environmentSlug },
  });

  return (
    <>
      <Tabs
        type="navigation"
        pathname={pathname}
        items={[
          {
            key: 'overview',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}`}>
                <LinkContentWrapper>Overview</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'deployments',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}/deployments`}>
                <LinkContentWrapper>Deployments</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'backups',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}/backups`}>
                <LinkContentWrapper>Backups</LinkContentWrapper>
              </Link>
            ),
          },

          {
            key: 'tasks',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}/tasks`}>
                <LinkContentWrapper>Tasks</LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'problems',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}/problems`}>
                <LinkContentWrapper>
                  Problems
                  {loading ? (
                    <ProblemCountSkeleton width={23.5} height={20} />
                  ) : (
                    <ProblemCount color={Colors.lagoonBlue}>{data?.environment?.problems?.length}</ProblemCount>
                  )}
                </LinkContentWrapper>
              </Link>
            ),
          },
          {
            key: 'insights',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}/insights`}>
                <LinkContentWrapper>Insights</LinkContentWrapper>
              </Link>
            ),
          },

          {
            key: 'variables',
            label: (
              <Link href={`/projects/${projectSlug}/${environmentSlug}/environment-variables`}>
                <LinkContentWrapper>Variables</LinkContentWrapper>
              </Link>
            ),
          },
        ]}
      >
        {children}
      </Tabs>
    </>
  );
};

export default EnvironmentNavTabs;
