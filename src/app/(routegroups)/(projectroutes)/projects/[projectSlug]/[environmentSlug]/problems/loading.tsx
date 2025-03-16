'use client';

import { ProblemsWrapper } from '@/components/pages/problems/_components/styles';
import { Collapse, Colors, Head3, LagoonProblemsOverview, LoadingSkeleton, Table } from '@uselagoon/ui-library';

const { ProblemsTable } = Table;
export default function Loading() {
  return (
    <>
      <ProblemsWrapper>
        <Collapse
          type="default"
          customBorder={Colors.pink}
          borderless
          items={[
            {
              children: <ProblemsTable skeleton />,
              key: 'critical',
              label: (
                <Head3>
                  Critical Problems <LoadingSkeleton width={20} />
                </Head3>
              ),
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.orange}
          borderless
          items={[
            {
              children: <ProblemsTable skeleton />,
              key: 'high',
              label: (
                <Head3>
                  High Rated Problems <LoadingSkeleton width={20} />
                </Head3>
              ),
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.yellow}
          borderless
          items={[
            {
              children: <ProblemsTable skeleton />,
              key: 'medium',
              label: (
                <Head3>
                  Medium Rated Problems <LoadingSkeleton width={20} />
                </Head3>
              ),
            },
          ]}
        />
        <Collapse
          type="default"
          customBorder={Colors.blue}
          borderless
          items={[
            {
              children: <ProblemsTable skeleton />,
              key: 'low',
              label: (
                <Head3>
                  Low Rated Problems <LoadingSkeleton width={20} />
                </Head3>
              ),
            },
          ]}
        />
      </ProblemsWrapper>
    </>
  );
}
