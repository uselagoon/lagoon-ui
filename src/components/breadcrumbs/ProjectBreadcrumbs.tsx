'use client';

import Link from 'next/link';

import { BreadCrumb } from '@uselagoon/ui-library';

export const ProjectBreadcrumbs = () => {
  return (
    <BreadCrumb
      activeKey="projects"
      items={[
        {
          key: 'projects',
          title: <Link href="/projects">Projects</Link>,
        },
        {
          key: 'tests',
          title: <Link href="/projects"> Test</Link>,
        },
      ]}
      type="default"
    />
  );
};
