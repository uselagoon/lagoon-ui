/**
 * Layout wrapping AllDeployments page
 */
import { AllDeploymentsBreadcrumbs } from '@/components/breadcrumbs/AllDeploymentsBreadcrumbs';

export default async function ProjectRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AllDeploymentsBreadcrumbs />
      {children}
    </>
  );
}
