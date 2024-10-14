/**
 * Project navigation layout wrapping project tabs.
 */
import ProjectNavTabs from '@/components/projectNavTabs/ProjectNavTabs';

export default async function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProjectNavTabs>{children}</ProjectNavTabs>;
}
