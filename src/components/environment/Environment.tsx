'use client';

import { Collapse, CopyToClipboard, Details, Head2, Head3, Head4, Text } from '@uselagoon/ui-library';

export default function Environment({ environment }: { environment: any }) {
  return (
    <>
      <Text>ENVIRONMENT NAME</Text>
      <Head3 style={{ marginBottom: '2.5rem' }}>{environment.name}</Head3>

      <Collapse
        type="default"
        items={[
          {
            children: (
              <Details
                bordered
                type="topToBottom"
                items={[
                  {
                    children: environment.environmentType,
                    key: 'env_type',
                    label: 'Environment type',
                  },
                  {
                    children: environment.deployType,
                    key: 'deployment_type',
                    label: 'Deployment Type',
                  },
                  {
                    children: environment.created,
                    key: 'created',
                    label: 'Created',
                  },
                  {
                    children: environment.updated,
                    key: 'updated',
                    label: 'Updated',
                  },

                  {
                    children: 'https://lagoondemo.example.org,https://nginx.main.lagoon-demo.ui-kubernetes.lagoon.sh',
                    key: 'routes',
                    label: 'Routes 1',
                  },
                ]}
              />
            ),
            key: 1,
            label: <Head3>Environment details</Head3>,
          },
        ]}
      />

      <Head2 style={{ marginTop: '2.5rem' }}>Routes</Head2>

      <Collapse
        type="default"
        items={[
          {
            children: <Text></Text>,
            key: 'active_routes',
            label: <Head4>Active routes</Head4>,
          },
        ]}
      />
    </>
  );
}
