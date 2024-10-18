import { Suspense } from 'react';

import { Metadata } from 'next';

import SettingsPage from '@/components/settings/SettingsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import me from '@/lib/query/me';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Settings() {
  return (
    <PreloadQuery
      query={me}
      variables={{
        displayName: 'Me',
        fetchPolicy: 'cache-and-network',
      }}
    >
      {queryRef => (
          <SettingsPage queryRef={queryRef as any} />
      )}
    </PreloadQuery>
  );
}
