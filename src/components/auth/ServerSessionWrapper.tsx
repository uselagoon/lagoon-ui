import { ReactNode } from 'react';

import { SignInAction } from '../../app/actions';
import { auth } from '../../auth';

/**
 *
 * A SSR wrapper returning a page.tsx component if authed, or redirects to login
 */
interface WrapperProps {
  children: ReactNode;
}
export default async function ServerSessionWrapper({ children }: WrapperProps) {
  const session = await auth();
  const tokenRefreshError = session.error === 'RefreshTokenError';
  if (tokenRefreshError) {
    await SignInAction();
    return null;
  }
  return <>{children}</>;
}
