import InsightsPage from '@/components/pages/insights/InsightsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWIthInsightsAndFacts from '@/lib/query/environmentWIthInsightsAndFacts';
import { QueryRef } from '@apollo/client';

type Props = {
  params: Promise<{ environmentSlug: string }>;
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

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: `${params.environmentSlug} | Insights`,
  };
}

export default async function Insights(props: { params: Promise<{ environmentSlug: string }> }) {
  const params = await props.params;

  const {
    environmentSlug
  } = params;

  return (
    <PreloadQuery
      query={environmentWIthInsightsAndFacts}
      variables={{
        displayName: 'Insights',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <InsightsPage environmentSlug={environmentSlug} queryRef={queryRef as QueryRef<InsightsData>} />}
    </PreloadQuery>
  );
}
