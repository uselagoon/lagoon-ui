import { Metadata } from 'next';

import KeyCloakPage from '@/components/2fa/Keycloak';

export const metadata: Metadata = {
  title: '2FA & Passwords',
};

export default async function Passwords() {
  return <KeyCloakPage kcUrl={process.env.AUTH_KEYCLOAK_ISSUER as string} />;
}
