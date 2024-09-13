import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';
import ProviderWrapper from '../contexts/SessionWrapper';
import AppProvider from '../contexts/AppContext';



// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = {
  title: 'Lagoon UI',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
      <ProviderWrapper>
        <AppProvider>
        {children}
      </AppProvider>
      </ProviderWrapper>
      </body>
    </html>
  );
}
