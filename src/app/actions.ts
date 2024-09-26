'use server';

import { signIn, signOut } from '../auth';

export async function SignOutAction() {
  await signOut({ redirectTo: '/api/logout' });
}

export async function SignInAction() {
  'use server';
  await signIn();
}
