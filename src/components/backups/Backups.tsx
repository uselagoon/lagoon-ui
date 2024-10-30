'use client';

import { BackupsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/backups/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { CopyToClipboard, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { DeploymentsFilters, StyledPickerWrapper, StyledRangePicker } from '../deployments/_components/styles';
import AddRestore from './_components/AddRestore';
import TriggerBackup from './_components/TriggerBackup';
import { backupResultOptions, statusOptions } from './_components/filterValues';

const { BackupsTable } = Table;

export default function Backups({ queryRef }: { queryRef: QueryRef<BackupsData> }) {
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
      parse: (value: string | undefined) => value as 'pending' | 'failed' | 'successful',
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
      <TriggerBackup environment={environment as any} refetch={{} as any} />
      <DeploymentsFilters>
        <Select
          options={backupResultOptions}
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

      <BackupsTable
        filterDateRange={range}
        filterStatus={status ?? undefined}
        backups={environment.backups}
        resultsPerPage={results ?? undefined}
        retrieveBackup={(backup, type) => <AddRestore backup={backup} type={type} />}
      />
    </>
  );
}
