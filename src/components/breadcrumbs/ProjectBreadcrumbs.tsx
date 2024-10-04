'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { BreadCrumb } from '@uselagoon/ui-library';

export const ProjectBreadcrumbs = () => {
  const { projectSlug, environmentSlug } = useParams<{ projectSlug: string; environmentSlug: string }>();

  const activeKey = environmentSlug || projectSlug || 'projects';
  const breadcrumbItems = [
    {
      key: 'projects',
      title: <Link href="/projects">Projects</Link>,
    },
    ...(projectSlug
      ? [
          {
            key: projectSlug,
            title: <Link href={`/projects/${projectSlug}`}>{projectSlug}</Link>,
          },
        ]
      : []),

    ...(environmentSlug
      ? [
          {
            key: environmentSlug,
            title: <Link href={`/projects/${projectSlug}/${environmentSlug}`}>{environmentSlug}</Link>,
          },
        ]
      : []),
  ];

  return <BreadCrumb activeKey={activeKey} items={breadcrumbItems} type="default" />;
};
