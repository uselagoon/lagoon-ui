'use client';

import { useState } from 'react';

import Link from 'next/link';

import { EyeOutlined } from '@ant-design/icons';
import { LagoonFilter } from '@uselagoon/ui-library';
import { Table } from 'antd';
import styled from 'styled-components';

export default function Organizations({ organizations }: { organizations: any }) {
  const [search, setSearch] = useState('');
  const [numberOfitems, setNumberOfItems] = useState(0);

  const cols = [
    {
      title: 'Organization Name',
      dataIndex: 'orgname',
      key: 'orgname',
    },
    {
      title: 'No. of Groups',
      dataIndex: 'groupnumber',
      key: 'groupnumber',
      render: (item: string) => <div>{item} groups</div>,
    },
    {
      title: 'No. of Projects',
      dataIndex: 'projects',
      key: 'projects',
      render: (item: string) => <div>{item} of 5 projects</div>,
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (item: string) => <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>{item}</div>,
    },
  ];

  const dataSource = organizations.map((item: any) => {
    return {
      orgname: (
        <>
          <Link href={`/organizations/${item.name}`} style={{ color: '#fff' }}>
            {item.friendlyName}
          </Link>
        </>
      ),
      groupnumber: item.groups?.length,
      projects: item.projects?.length,
      target: (
        <>
          {item.deployTargets.map((deploytarget: any) => (
            <div key={deploytarget.id} className="target">
              {deploytarget.name}
            </div>
          ))}
        </>
      ),
      actions: (
        <Link href={`/organizations/${item.name}`} style={{ color: '#fff' }}>
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
          searchText: search,
          setSearchText: setSearch,
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
          selectedState: numberOfitems,
          setSelectedState: setNumberOfItems as any,
        }}
      />
      <StyledTable dataSource={dataSource} columns={cols} pagination={false} />
    </>
  );
}

const StyledTable = styled(Table)`
  border: 1px solid ${props => (props.theme.colorScheme === 'dark' ? '#000' : '#fff')};
  border-radius: 0;
  font-family: 'Open Sans', sans-serif !important;
  box-shadow: 2px 2px 8px 0px #ffffff40;
  margin-block: 3rem;
  .ant-table-thead {
    tr {
      th {
        padding-block: 1.75rem;
        background-color: ${props => (props.theme.colorScheme === 'dark' ? '#76715E' : '#f8f8f2')};
        text-align: left;
        padding-left: 0.5rem;
        border: unset;
        border-bottom: 1px solid #76715e;
        color: ${props => (props.theme.colorScheme === 'dark' ? '#f8f8f2' : 'initial')};
        font-size: 15px;
        line-height: 14px;
        font-weight: 600;
        &:before {
          display: none;
        }
      }
      &:first-child > *:first-child,
      &:first-child > *:last-child {
        border-start-start-radius: 0 !important;
        border-start-end-radius: 0 !important;
      }
    }
  }
  tbody {
    background-color: ${props => (props.theme.colorScheme === 'dark' ? '#272822' : '#fff')};
    color: ${props => (props.theme.colorScheme === 'dark' ? '#f2f2f2' : '#272822')};

    tr > td {
      border-bottom: 2px solid ${props => (props.theme.colorScheme === 'dark' ? '#76715E' : '#F8F8F2')} !important;
      border-right: 2px solid ${props => (props.theme.colorScheme === 'dark' ? '#76715E' : '#F8F8F2')} !important;
      padding-left: 0.5rem !important;
      &:first-child {
        border-left: 2px solid ${props => (props.theme.colorScheme === 'dark' ? '#76715E' : '#F8F8F2')} !important;
      }
      &.ant-table-cell-row-hover {
        background: ${props => (props.theme.colorScheme === 'dark' ? '#32332c' : '#F8F8F2')} !important;
      }
    }
  }
  .highlighted {
    color: ${props => props.theme.UI.texts.primary};
    background-color: ${props => props.theme.UI.highlights.selection};
  }
`;
