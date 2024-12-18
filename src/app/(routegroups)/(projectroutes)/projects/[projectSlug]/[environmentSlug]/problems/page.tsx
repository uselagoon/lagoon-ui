import ProblemsPage from '@/components/pages/problems/ProblemsPage';
import { PreloadQuery } from '@/lib/apolloClient';
import environmentWithProblems from '@/lib/query/environmentWithProblems';
import { QueryRef } from '@apollo/client';

type Props = {
  params: { environmentSlug: string };
};

enum ProblemSeverityRating {
  NONE,
  UNKNOWN,
  NEGLIGIBLE,
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}

export type Problem = {
  id: number;
  identifier: string;
  environment: {
    id: number | null;
    name: string | null;
  };
  data: {};
  severity: keyof typeof ProblemSeverityRating;
  source: string;
  service: string;
  created: string;
  deleted: string;
  severityScore: number;
  associatedPackage: string;
  description: string;
  version: string;
  fixedVersion: string;
  links: string;
};

type Environment = {
  id: number;
  openshiftProjectName: string;
  project: {
    name: string;
    problemsUi: boolean;
    factsUi: boolean;
  };
  problems: Problem[];
};

export interface ProblemsData {
  environment: Environment;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.environmentSlug} | Problems`,
  };
}

export default async function Problems({ params: { environmentSlug } }: { params: { environmentSlug: string } }) {
  return (
    <PreloadQuery
      query={environmentWithProblems}
      variables={{
        displayName: 'Problems',
        openshiftProjectName: environmentSlug,
        limit: null,
      }}
    >
      {queryRef => <ProblemsPage environmentSlug={environmentSlug} queryRef={queryRef as QueryRef<ProblemsData>} />}
    </PreloadQuery>
  );
}
