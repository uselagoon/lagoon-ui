import { redirect } from 'next/navigation';

/**
 * error originated from signing in from multiple tabs is caught here - the user is actually authenticated,
 * but KC login throws an error
 * related : https://github.com/nextauthjs/next-auth/issues/11641
 *           https://github.com/nextauthjs/next-auth/discussions/6898
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const errorType = url.searchParams.get('error');

  if (errorType === 'Configuration') {
    redirect('/');
  }
  redirect('/autherror');
}
