import { NextResponse } from 'next/server';

import { auth } from '../../../auth';

export async function GET() {
  const session = await auth();

  if (session && session.id_token) {
    const idToken = session.id_token;

    const baseUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;

    const clientId = process.env.AUTH_KEYCLOAK_ID;

    const url = `${baseUrl}?id_token_hint=${idToken}&client_id=${clientId}`;
    try {
      const resp = await fetch(url, { method: 'GET' });

      if (!resp.ok) {
        console.error(resp);
        throw new Error(`Logout request failed with status: ${resp.status}`);
      }
    } catch (err) {
      console.error('Error logging out from Keycloak:', err);
      return NextResponse.json({}, { status: 500 });
    }
  }

  return NextResponse.json({}, { status: 200 });
}
