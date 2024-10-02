'use client';

import manualSignOut from '../../../utils/manualSignOut';

export function SignOutBtn() {
  return (
    <span
      onClick={() => {
        manualSignOut();
      }}
    >
      Sign Out
    </span>
  );
}
