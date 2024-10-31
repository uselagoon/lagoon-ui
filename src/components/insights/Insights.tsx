'use client';

import { InsightsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/insights/page';
import { QueryRef, useReadQuery } from '@apollo/client';
import { Collapse, Head3, Table } from '@uselagoon/ui-library';

import { InsightsPageWrapper } from './_components/styles';

const { InsightsTable, FactsTable } = Table;

export default function Insights({ queryRef }: { queryRef: QueryRef<InsightsData> }) {
  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const { insights, facts } = environment;

  return (
    <InsightsPageWrapper>
      <Collapse
        type="default"
        defaultActiveKey="facts"
        borderless
        items={[
          {
            children: <FactsTable facts={facts} />,
            key: 'facts',
            label: <Head3>Facts</Head3>,
          },
        ]}
      />

      <Collapse
        type="default"
        borderless
        items={[
          {
            children: <InsightsTable insights={insights} />,
            key: 'insights',
            label: <Head3>Insights</Head3>,
          },
        ]}
      />
    </InsightsPageWrapper>
  );
}
