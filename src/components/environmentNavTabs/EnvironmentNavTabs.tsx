'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { Tabs } from '@uselagoon/ui-library';

const EnvironmentNavTabs = ({ children }: { children: ReactNode }) => {
  const { projectSlug, environmentSlug } = useParams<{ projectSlug: string; environmentSlug: string }>();

  const pathname = usePathname();
  return (
    <>
      <Tabs
        type="navigation"
        pathname={pathname}
        items={[
          {
            key: 'overview',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}`}>Overview</Link>,
          },
          {
            key: 'deployments',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}/deployments`}>Deployments</Link>,
          },
          {
            key: 'backups',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}/backups`}>Backups</Link>,
          },

          {
            key: 'tasks',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}/tasks`}>Tasks</Link>,
          },
          {
            key: 'problems',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}/problems`}>Problems</Link>,
          },
          {
            key: 'insights',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}/insights`}>Insights</Link>,
          },

          {
            key: 'variables',
            label: <Link href={`/projects/${projectSlug}/${environmentSlug}/variables`}>Variables</Link>,
          },
        ]}
      >
        {children}
      </Tabs>
    </>
  );
};

export default EnvironmentNavTabs;
