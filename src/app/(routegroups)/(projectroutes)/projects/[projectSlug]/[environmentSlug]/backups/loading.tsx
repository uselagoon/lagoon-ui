'use client';

import { deploymentResultOptions, statusOptions } from '@/components/deployments/_components/filterValues';
import {
  DeploymentsFilters,
  StyledPickerWrapper,
  StyledRangePicker,
} from '@/components/deployments/_components/styles';
import { Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { BackupsTable } = Table;

export default function Loading() {
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
      parse: (value: string | undefined) => value,
    },
  });

  const handleRangeChange = (_: unknown, dateRange: [string, string]) => {
    setQuery({ range: dateRange });
  };

  return (
    <>
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
      <BackupsTable skeleton />
    </>
  );
}
