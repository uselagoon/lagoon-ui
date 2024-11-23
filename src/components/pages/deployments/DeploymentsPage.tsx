'use client';

import { startTransition, useEffect } from 'react';

import { usePathname } from 'next/navigation';

import {
  Deployment,
  DeploymentsData,
} from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/deployments/(deployments-page)/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Select, Table } from '@uselagoon/ui-library';
import dayjs from 'dayjs';
import { useQueryStates } from 'nuqs';

import CancelDeployment from '../../cancelDeployment/CancelDeployment';
import CustomRangePicker from '../../datepicker/DatePicker';
import DeployLatest from './_components/DeployLatest';
import { deploymentResultOptions, statusOptions } from './_components/filterValues';
import { DeploymentsFilters } from './_components/styles';

const { DeploymentsTable } = Table;

export default function DeploymentsPage({ queryRef }: { queryRef: QueryRef<DeploymentsData> }) {
  const pathname = usePathname();

  const [{ results, range, status }, setQuery] = useQueryStates({
    results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : undefined),
    },
    range: {
      defaultValue: undefined,
      parse: (value: string | undefined) => {
        if (value !== undefined) {
          // format like "2024-11-07,2024-11-07"
          const parsedRange = value.split(',').map(dateStr => dayjs(dateStr.trim()).format('YYYY-MM-DD'));
          return parsedRange.length === 2 ? parsedRange : undefined;
        }
        return undefined;
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

  // polling every 20s if status needs to be checked
  useEffect(() => {
    const shouldPoll = environment.deployments.some(({ status }) =>
      ['new', 'pending', 'queued', 'running'].includes(status)
    );
    if (shouldPoll) {
      const intId = setInterval(() => {
        startTransition(async () => {
          await refetch();
        });
      }, 20000);

      return () => clearInterval(intId);
    }
  }, [environment.deployments, refetch]);

  const handleRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates) {
      const formattedRange = dates
        .filter(Boolean) // remove falsy values
        .map(date => date!.format('YYYY-MM-DD'));
      setQuery({ range: formattedRange });
    } else {
      setQuery({ range: null });
    }
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

        <CustomRangePicker range={range} handleRangeChange={handleRangeChange} />
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
