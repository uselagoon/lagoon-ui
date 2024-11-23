'use client';

import { InsightsPageWrapper } from '@/components/pages/insights/_components/styles';
import { Collapse, Head3, Table } from '@uselagoon/ui-library';

const { FactsTable, InsightsTable } = Table;
export default function Loading() {
  return (
    <InsightsPageWrapper>
      <Collapse
        type="default"
        borderless
        items={[
          {
            children: <FactsTable skeleton />,
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
            children: <InsightsTable skeleton />,
            key: 'insights',
            label: <Head3>Insights</Head3>,
          },
        ]}
      />
    </InsightsPageWrapper>
  );
}
