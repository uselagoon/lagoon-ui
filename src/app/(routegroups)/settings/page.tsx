import { Metadata } from 'next';

import SettingsPage from '@/components/settings/SettingsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import me from '@/lib/query/me';
import { QueryRef } from '@apollo/client';

export const metadata: Metadata = {
  title: 'Settings',
};

type SshKey = {
  id: number;
  name: string;
  created: string;
  keyType: string;
  keyValue: string;
  keyFingerprint: string;
};

type Me = {
  id: number;
  email: string;
  sshKeys: SshKey[];
};

export interface SettingsData {
  me: Me;
}

export default async function Settings() {
  return (
    <PreloadQuery
      query={me}
      variables={{
        displayName: 'Me',
        fetchPolicy: 'cache-and-network',
      }}
    >
      {queryRef => <SettingsPage queryRef={queryRef as QueryRef<SettingsData>} />}
    </PreloadQuery>
  );
}
