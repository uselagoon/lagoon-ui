import type { Metadata } from 'next';

import ClientSessionWrapper from '../components/auth/ClientSessionWrapper';
import ServerSessionWrapper from '../components/auth/ServerSessionWrapper';
import AppProvider from '../contexts/AppContext';
import AuthProvider from '../contexts/AuthProvider';
import StyleProvider from '../contexts/StyleProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lagoon UI',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png' }],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ServerSessionWrapper>
            <ClientSessionWrapper>
              <StyleProvider>
                <AppProvider kcUrl={process.env.AUTH_KEYCLOAK_ISSUER}>{children}</AppProvider>
              </StyleProvider>
            </ClientSessionWrapper>
          </ServerSessionWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
