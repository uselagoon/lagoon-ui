'use client';

import { useState } from 'react';

import Link from 'next/link';

import { EyeOutlined, SmileOutlined } from '@ant-design/icons';
import { LagoonFilter, ProjectsTable } from '@uselagoon/ui-library';

export default function Projects({ data }: { data: any }) {
  const [search, setSearch] = useState('');
  const [numberOfitems, setNumberOfItems] = useState(0);

  const cols = [
    {
      title: 'Health',
      dataIndex: 'health',
      key: 'health',
      render: (item: string) => <div style={{ textAlign: 'center', color: 'green', fontSize: '1.25rem' }}>{item}</div>,
    },
    {
      title: 'Project',
      dataIndex: 'project_name',
      key: 'project_name',
      render: (text: string) => (
        <div>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'No. Envs',
      dataIndex: 'envs',
      key: 'envs',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Cluster',
      dataIndex: 'cluster',
      key: 'cluster',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: 'Last Deployment',
      dataIndex: 'last_deployment',
      key: 'last_deployment',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item: string) => <div style={{ textAlign: 'center', fontSize: '1.25rem' }}>{item}</div>,
    },
  ];
  const dataSource = data.allProjects.map((item: any) => {
    return {
      health: <SmileOutlined />,
      project_name: item.name,
      envs: item.environments.length,
      last_deployment: '12/12/24 23:05 UTC',
      actions: (
        <Link href={`/projects/${item.name}`}>
          <EyeOutlined />
        </Link>
      ),

      cluster: 'US3',
      origin: 'https://github.com/amazeeio-demos/as-demo',
    };
  });
  return (
    <>
      <LagoonFilter
        searchOptions={{
          state: {
            searchText: search,
            setSearchText: setSearch,
          },
        }}
        selectOptions={{
          options: [
            {
              value: 10,
              label: '10 Results per page',
            },
            {
              value: 20,
              label: '20 Results per page',
            },
            {
              value: 50,
              label: '50 Results per page',
            },
          ],
          state: {
            selectedState: numberOfitems,
            setSelectedState: setNumberOfItems as any,
          },
        }}
      />
      <ProjectsTable filterString={search} dataSource={dataSource} columns={cols} resultsPerPage={numberOfitems} />
    </>
  );
}
