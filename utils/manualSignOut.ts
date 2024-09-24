import { signOut } from 'next-auth/react';

export default async function manualSignOut() {
  const response = await fetch('/api/logout', {
    method: 'GET',
  });
  if (response.ok) {
    await signOut({ redirectTo: '/', redirect: true });
  } else {
    console.error('Failed to sign out');
  }
}
