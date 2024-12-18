'use client';

import {
  Problem,
  ProblemsData,
} from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/problems/page';
import EnvironmentNotFound from '@/components/errors/EnvironmentNotFound';
import { QueryRef, useReadQuery } from '@apollo/client';
import { Collapse, Colors, Head3, LagoonProblemsOverview, Table } from '@uselagoon/ui-library';

import { ProblemsWrapper } from './_components/styles';

const { ProblemsTable } = Table;

enum ProblemSeverityRating {
  NONE,
  UNKNOWN,
  NEGLIGIBLE,
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}
export default function ProblemsPage({
  queryRef,
  environmentSlug,
}: {
  queryRef: QueryRef<ProblemsData>;
  environmentSlug: string;
}) {
  const {
    data: { environment },
  } = useReadQuery(queryRef);

  if (!environment) {
    return <EnvironmentNotFound openshiftProjectName={environmentSlug} />;
  }

  const { problems } = environment;

  const filterBySeverity = (problems: Problem[], severity: keyof typeof ProblemSeverityRating) =>
    problems.filter(problem => problem.severity === severity);

  const criticalProblems = filterBySeverity(problems, 'CRITICAL');
  const highProblems = filterBySeverity(problems, 'HIGH');
  const mediumProblems = filterBySeverity(problems, 'MEDIUM');
  const lowProblems = filterBySeverity(problems, 'LOW');

  // const dismissedProblems = problems.filter(problem => problem.deleted === '0000-00-00 00:00:00');

  const dismissedProblems = [] as Problem[];
  return (
    <>
      <LagoonProblemsOverview
        problems={problems.length}
        critical={criticalProblems.length}
        high={highProblems.length}
        medium={mediumProblems.length}
        low={lowProblems.length}
      />
      <ProblemsWrapper>
        <Collapse
          type="default"
          customBorder={Colors.pink}
          borderless
          items={[
            {
              children: <ProblemsTable problems={criticalProblems} />,
              key: 'critical',
              label: <Head3>Critical Problems ({criticalProblems.length})</Head3>,
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.orange}
          borderless
          items={[
            {
              children: <ProblemsTable problems={highProblems} />,
              key: 'high',
              label: <Head3>High Rated Problems ({highProblems.length})</Head3>,
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.yellow}
          borderless
          items={[
            {
              children: <ProblemsTable problems={mediumProblems} />,
              key: 'medium',
              label: <Head3>Medium Rated Problems ({mediumProblems.length})</Head3>,
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.blue}
          borderless
          items={[
            {
              children: <ProblemsTable problems={lowProblems} />,
              key: 'low',
              label: <Head3>Low Rated Problems ({lowProblems.length})</Head3>,
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.white}
          borderless
          items={[
            {
              children: <ProblemsTable problems={dismissedProblems} />,
              key: 'dismissed',
              label: <Head3>Dismissed Problems ({dismissedProblems.length})</Head3>,
            },
          ]}
        />
      </ProblemsWrapper>
    </>
  );
}
