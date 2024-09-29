import type { Metadata } from 'next';

import ClientSessionWrapper from '../components/auth/ClientSessionWrapper';
import ServerSessionWrapper from '../components/auth/ServerSessionWrapper';
import AppProvider from '../contexts/AppContext';
import AuthProvider from '../contexts/AuthProvider';
import StyleProvider from '../contexts/StyleProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lagoon UI',
  description: '',
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
                <AppProvider>{children}</AppProvider>
              </StyleProvider>
            </ClientSessionWrapper>
          </ServerSessionWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
