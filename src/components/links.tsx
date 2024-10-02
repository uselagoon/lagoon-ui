import Link from 'next/link';

import { SignOutBtn } from './auth/SignOut';

export const navLinks = [
  <Link href="/projects">Projects</Link>,
  <Link href="/organizations">Organizations</Link>,
  <Link href="/knowledge">Knowledge</Link>,
];

export const getUserMenuItems = (kcUrl: string) => {
  return [
    {
      label: <Link href="/settings">Settings</Link>,
      key: 'settings',
    },
    {
      label: (
        <Link target="_blank" href={`${kcUrl}/account`} key="account" data-cy="account">
          Your account
        </Link>
      ),
      key: 'account',
    },
    {
      type: 'divider',
      key: 'divider',
    },
    {
      label: <SignOutBtn />,
      key: 'sign_out',
    },
  ];
};
