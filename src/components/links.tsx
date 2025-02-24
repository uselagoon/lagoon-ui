import Link from 'next/link';

import { SignOutBtn } from './auth/SignOut';

export const navLinks = [
  <Link data-cy="nav-projects" href="/projects">
    Projects
  </Link>,
  <Link data-cy="nav-organizations" href="/organizations">
    Organizations
  </Link>,
  <Link data-cy="nav-deployments" href="/alldeployments">
    All Deployments
  </Link>,
];

export const getUserMenuItems = (kcUrl: string) => {
  return [
    {
      label: (
        <Link data-cy="nav-settings" href="/settings">
          Settings
        </Link>
      ),
      key: 'settings',
    },
    {
      label: (
        <Link data-cy="nav-account" target="_blank" href={`${kcUrl}/account`} key="account">
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
