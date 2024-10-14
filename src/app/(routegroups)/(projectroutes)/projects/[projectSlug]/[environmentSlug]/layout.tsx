/**
 * Layout wrapping project environment tabs.
 */
import EnvironmentNavTabs from '@/components/environmentNavTabs/EnvironmentNavTabs';

export default async function EnvironmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EnvironmentNavTabs>{children}</EnvironmentNavTabs>;
}
