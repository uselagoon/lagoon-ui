'use client';

import { SetStateAction } from 'react';

import { StyledEnvironmentsWrapper } from '@/components/environments/styles';
import { LagoonCard, LagoonFilter } from '@uselagoon/ui-library';
import { useQueryState } from 'nuqs';

export default function Loading() {
  const [search, setSearch] = useQueryState('search');

  const numberOfLoaders = Math.floor((window.innerHeight * 8) / 10 / 80);

  const renderCard = (key: number) => <LagoonCard type="loaderOnly" key={`loader-card-${key}`} />;

  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
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
          selectedState: null,
          setSelectedState: () => {},
        }}
      />
      <StyledEnvironmentsWrapper>
        {[...Array<undefined>(numberOfLoaders)].map((_, idx) => renderCard(idx))}
      </StyledEnvironmentsWrapper>
    </>
  );
}
