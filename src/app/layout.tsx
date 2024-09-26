import type { Metadata } from 'next';

import PageSessionWrapper from '../components/auth/PageSessionWrapper';
import AppProvider from '../contexts/AppContext';
import AuthProvider from '../contexts/AuthProvider';
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
          <PageSessionWrapper>
            <AppProvider>{children}</AppProvider>
          </PageSessionWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
