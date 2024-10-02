'use client';

/**
 * Forces client logout if token could not be refreshed: (refresh_token itself expired)
 * avoids 401 errors on the client.
 */
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';

import manualSignOut from 'utils/manualSignOut';

export default function RefreshTokenHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshTokenError') {
      manualSignOut();
    }
  }, [session]);

  return null;
}
