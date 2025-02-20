'use client';

import manualSignOut from '../../../utils/manualSignOut';

export function SignOutBtn() {
  return (
    <span
      data-cy="sign-out"
      onClick={() => {
        manualSignOut();
      }}
    >
      Sign Out
    </span>
  );
}
