'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Tabs } from '@uselagoon/ui-library';

export const ProjectNavTabs = ({ children }: { children: ReactNode }) => {
  const { projectSlug, environmentSlug } = useParams<{ projectSlug: string; environmentSlug: string }>();

  const pathname = usePathname();

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
            label: <Link href={`/projects/${projectSlug}`}>Environments</Link>,
          },
          {
            key: 'project-details',
            label: <Link href={`/projects/${projectSlug}/project-details`}>Details</Link>,
          },
          {
            key: 'project-variables',
            label: <Link href={`/projects/${projectSlug}/project-variables`}>Variables</Link>,
          },
        ]}
      >
        {children}
      </Tabs>
    </>
  );
};

export default ProjectNavTabs;
