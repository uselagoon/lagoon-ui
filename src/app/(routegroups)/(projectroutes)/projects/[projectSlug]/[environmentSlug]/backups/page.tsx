import Backups from '@/components/backups/Backups';
import Deployments from '@/components/deployments/Deployments';
import { PreloadQuery, getClient } from '@/lib/apolloClient';
import environmentWithBackups from '@/lib/query/environmentWithBackups';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string };
};

export type Backup = {
	id: number;
	source: string;
	backupId: string;
	created: string;
	restore: {
		id: number;
		status: 'pending' | 'failed' | 'complete';
		restoreLocation?: string | null;
		restoreSize?: string | null;
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

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Backups`,
  };
}

export default async function BackupsPage({ params: { environmentSlug } }: { params: { environmentSlug: string } }) {
  return (
    <PreloadQuery
      query={environmentWithBackups}
      variables={{
        displayName: 'Backups',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <Backups queryRef={queryRef as QueryRef<BackupsData>} />}
    </PreloadQuery>
  );
}
