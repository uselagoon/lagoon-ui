/**
 * Layout wrapping Organizations related routes
 */
import { OrgBreadcrumbs } from '@/components/breadcrumbs/OrgBreadcrumbs';

export default async function ProjectRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <OrgBreadcrumbs />
      {children}
    </>
  );
}
