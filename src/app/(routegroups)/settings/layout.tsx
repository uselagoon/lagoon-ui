/**
 * Project navigation layout wrapping settings tabs.
 */
import SettingsNavTabs from '@/components/settingsNavtabs/SettingsNavTabs';

export default async function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SettingsNavTabs>{children}</SettingsNavTabs>;
}
