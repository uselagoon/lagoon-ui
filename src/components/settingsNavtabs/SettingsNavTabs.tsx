'use client';

import { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs } from '@uselagoon/ui-library';

export const SettingsNavTabs = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  console.warn(pathname);

  return (
    <section style={{ marginTop: '26px' }}>
      <Tabs
        type="navigation"
        pathname={pathname}
        items={[
          {
            key: 'setting',
            label: <Link href={`/settings`}>SSH KEYS</Link>,
          },
          {
            key: '2fa',
            label: <Link href={`/settings/2fa/`}>2FA & Passwords</Link>,
          },
        ]}
      >
        {children}
      </Tabs>
    </section>
  );
};

export default SettingsNavTabs;
