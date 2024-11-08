/**
 * Layout wrapping BulkDeployments page
 */
import { BulkDeploymentsBreadcrumbs } from '@/components/breadcrumbs/BulkDeploymentsBreadcrumbs';

export default async function ProjectRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BulkDeploymentsBreadcrumbs />
      {children}
    </>
  );
}
