import type { Metadata } from 'next';

import SessionRedirect from '../components/auth/SessionRedirect';
import AppProvider from '../contexts/AppContext';
import AuthProvider from '../contexts/SessionWrapper';
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
          <SessionRedirect>
            <AppProvider>{children}</AppProvider>
          </SessionRedirect>
        </AuthProvider>
      </body>
    </html>
  );
}
