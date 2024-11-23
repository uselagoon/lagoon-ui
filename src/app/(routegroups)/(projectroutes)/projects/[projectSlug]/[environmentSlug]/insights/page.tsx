import InsightsPage from '@/components/pages/insights/InsightsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWIthInsightsAndFacts from '@/lib/query/environmentWIthInsightsAndFacts';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string };
};

export type Fact = {
  description: string;
  id: number;
  name: string;
  source: string;
  value: string;
};

export type Insight = {
  created: string;
  downloadUrl: string;
  file: string;
  fileId: number | null;
  id: number;
  service: string;
  size: string;
  type: string;
};

type Environment = {
  id: number;
  openshiftProjectName: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
  };
  facts: Fact[];
  insights: Insight[];
};

export interface InsightsData {
  environment: Environment;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Insights`,
  };
}

export default async function Insights({ params: { environmentSlug } }: { params: { environmentSlug: string } }) {
  return (
    <PreloadQuery
      query={environmentWIthInsightsAndFacts}
      variables={{
        displayName: 'Insights',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <InsightsPage queryRef={queryRef as QueryRef<InsightsData>} />}
    </PreloadQuery>
  );
}
