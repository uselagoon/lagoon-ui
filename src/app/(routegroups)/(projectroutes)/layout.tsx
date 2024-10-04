/**
 * Layout wrapping project related routes
 */
import { ProjectBreadcrumbs } from '@/components/breadcrumbs/ProjectBreadcrumbs';

export default async function ProjectRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProjectBreadcrumbs />
      {children}
    </>
  );
}
