/**
 * Project navigation layout wrapping organization tabs.
 */
import OrgNavTabs from '@/components/OrgNavtabs/OrgNavTabs';

export default async function OrgLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OrgNavTabs>{children}</OrgNavTabs>;
}
