'use client';

import { SetStateAction } from 'react';

import { envFilterValues } from '@/components/pages/environments/_components/filterValues';
import { StyledEnvironmentsWrapper } from '@/components/pages/environments/styles';
import { LagoonCard, LagoonFilter, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { EnvironmentsTable } = Table;
export default function Loading() {
  const numberOfLoaders = Math.floor((window.innerHeight * 8) / 10 / 80);

  const renderCard = (key: number) => <LagoonCard type="loaderOnly" key={`loader-card-${key}`} />;

  const [{ search, env_count, view }, setQuery] = useQueryStates({
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },

    env_count: {
      defaultValue: 5,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 5),
    },
    view: {
      defaultValue: 'card',
      parse: (value: string | undefined) => {
        if (value === 'list') {
          return 'list';
        }
        return 'card'; // default to 'card' for undefined or any value other than 'list'
      },
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };
  const setEnvCount = (val: string) => {
    setQuery({ env_count: Number(val) });
  };

  const loaderToRender =
    view === 'card' ? (
      <StyledEnvironmentsWrapper>
        {[...Array<undefined>(numberOfLoaders)].map((_, idx) => renderCard(idx))}
      </StyledEnvironmentsWrapper>
    ) : (
      <EnvironmentsTable skeleton />
    );
  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
        selectOptions={{
          options: envFilterValues,
          selectedState: env_count,
          setSelectedState: setEnvCount as React.Dispatch<SetStateAction<unknown>>,
        }}
      />

      {loaderToRender}
    </>
  );
}
