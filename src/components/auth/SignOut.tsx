'use client';

import manualSignOut from '../../../utils/manualSignOut';

export function SignOutBtn() {
  return (
    <button
      onClick={() => {
        manualSignOut();
      }}
    >
      Sign Out
    </button>
  );
}
