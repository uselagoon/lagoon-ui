import { signIn } from '../../../auth';

/**
 *
 * This route handler works with NextAuth 5 custom login page;
 * automatically takes the user th the provider login screen
 */

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  return signIn('keycloak', { redirectTo: searchParams.get('callbackUrl') ?? '' });
}
