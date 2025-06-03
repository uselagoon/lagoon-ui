import BackupsPage from '@/components/pages/backups/BackupsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithBackups from '@/lib/query/environmentWithBackups';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string }>;
};

export type Backup = {
  id: number;
  source: string;
  backupId: string;
  created: string;
  restore: {
    id: number;
    status: 'pending' | 'failed' | 'successful';
    restoreLocation?: string | null;
    restoreSize?: number | null;
  } | null;
};

type Environment = {
  id: number;
  openshiftProjectName: string;
  deployType: string;
  deployBaseRef: string;
  deployHeadRef: string;
  deployTitle: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
  };
  backups: Backup[];
};

export interface BackupsData {
  environment: Environment;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.environmentSlug} | Backups`,
  };
}

export default async function Backups(props: { params: Promise<{ environmentSlug: string }> }) {
  const params = await props.params;

  const { environmentSlug } = params;

  return (
    <PreloadQuery
      query={environmentWithBackups}
      variables={{
        displayName: 'Backups',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <BackupsPage environmentSlug={environmentSlug} queryRef={queryRef as QueryRef<BackupsData>} />}
    </PreloadQuery>
  );
}
