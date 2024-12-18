'use client';

import { startTransition, useEffect } from 'react';

import { BackupsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/backups/page';
import EnvironmentNotFound from '@/components/errors/EnvironmentNotFound';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Select, Table } from '@uselagoon/ui-library';
import dayjs from 'dayjs';
import { useQueryStates } from 'nuqs';

import CustomRangePicker from '../../datepicker/DatePicker';
import { DeploymentsFilters } from '../deployments/_components/styles';
import AddRestore from './_components/AddRestore';
import { backupResultOptions, statusOptions } from './_components/filterValues';

const { BackupsTable } = Table;

export default function BackupsPage({
  queryRef,
  environmentSlug,
}: {
  queryRef: QueryRef<BackupsData>;
  environmentSlug: string;
}) {
  const [{ results, range, status }, setQuery] = useQueryStates({
    results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : undefined),
    },
    range: {
      defaultValue: undefined,
      parse: (value: string | undefined) => {
        if (value !== undefined) {
          const parsedRange = value.split(',').map(dateStr => dayjs(dateStr.trim()).format('YYYY-MM-DD'));
          return parsedRange.length === 2 ? parsedRange : undefined;
        }
        return undefined;
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

  if (!environment) {
    return <EnvironmentNotFound openshiftProjectName={environmentSlug} />;
  }

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

  // polling every 20s if status needs to be checked
  useEffect(() => {
    // only poll if any backup has a 'restore.status' of 'pending'
    const shouldPoll = environment.backups.some(({ restore }) => restore?.status === 'pending');

    if (shouldPoll) {
      const intId = setInterval(() => {
        startTransition(async () => {
          await refetch();
        });
      }, 20000);
      return () => clearInterval(intId);
    }
  }, [environment.backups, refetch]);

  return (
    <>
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
        <CustomRangePicker range={range} handleRangeChange={handleRangeChange} />
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
