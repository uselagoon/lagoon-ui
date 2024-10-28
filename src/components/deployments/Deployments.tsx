'use client';

import { usePathname } from 'next/navigation';

import {
  Deployment,
  DeploymentsData,
} from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import CancelDeployment from './_components/CancelDeployment';
import DeployLatest from './_components/DeployLatest';
import { deploymentResultOptions, statusOptions } from './_components/filterValues';
import { DeploymentsFilters, StyledPickerWrapper, StyledRangePicker } from './_components/styles';

const { DeploymentsTable } = Table;

export default function Deployments({ queryRef }: { queryRef: QueryRef<DeploymentsData> }) {
  const pathname = usePathname();

  const [{ results, range, status }, setQuery] = useQueryStates({
    results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : undefined),
    },
    range: {
      defaultValue: undefined,
      parse: (value: string | undefined) => {
        return value !== undefined ? JSON.parse(value).split(',') : undefined;
      },
    },
    status: {
      defaultValue: undefined,
      parse: (value: string | undefined) => value as Deployment['status'],
    },
  });

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const handleRangeChange = (_: unknown, dateRange: [string, string]) => {
    setQuery({ range: dateRange });
  };

  return (
    <>
      <DeployLatest environment={environment} refetch={refetch} />
      <DeploymentsFilters>
        <Select
          options={deploymentResultOptions}
          value={results}
          defaultOpen={false}
          placeholder="Number of results"
          onSelect={val => {
            setQuery({ results: val });
          }}
        />
        <Select
          options={statusOptions}
          defaultOpen={false}
          value={status}
          placeholder="Status"
          onSelect={val => {
            setQuery({ status: val });
          }}
        />

        <Select
          defaultOpen={false}
          value={range?.every(Boolean) ? `${range[0]} - ${range[1]}` : 'Select date range'}
          dropdownStyle={{ width: 300 }}
          dropdownRender={() => (
            <StyledPickerWrapper
              onMouseDown={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <StyledRangePicker onChange={handleRangeChange} />
            </StyledPickerWrapper>
          )}
        />
      </DeploymentsFilters>
      <DeploymentsTable
        filterDateRange={range}
        filterStatus={status ?? undefined}
        deployments={environment.deployments}
        basePath={pathname}
        resultsPerPage={results ?? undefined}
        cancelDeployment={(deployment: Deployment) => <CancelDeployment deployment={deployment} />}
      />
    </>
  );
}
