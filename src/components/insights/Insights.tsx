'use client';

import { SetStateAction } from 'react';

import { InsightsData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/insights/page';
import { QueryRef, useReadQuery } from '@apollo/client';
import { Collapse, Head3, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import dayjs from 'dayjs';
import { useQueryStates } from 'nuqs';

import CustomRangePicker from '../datepicker/DatePicker';
import { factsSortvalues, insightsSortValues, resultsFilterValues } from './_components/filterValues';
import { InsightsPageWrapper } from './_components/styles';

const { InsightsTable, FactsTable } = Table;

export default function Insights({ queryRef }: { queryRef: QueryRef<InsightsData> }) {
  const {
    data: { environment },
  } = useReadQuery(queryRef);

  const [
    { fact_results, fact_query, fact_sort, insights_query, insights_sort, insights_results, insights_dates },
    setQuery,
  ] = useQueryStates({
    fact_results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    fact_query: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    fact_sort: {
      defaultValue: null,
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },

    insights_dates: {
      defaultValue: undefined,
      parse: (value: string | undefined) => {
        if (value !== undefined) {
          const parsedRange = value.split(',').map(dateStr => dayjs(dateStr.trim()).format('YYYY-MM-DD'));
          return parsedRange.length === 2 ? parsedRange : undefined;
        }
        return undefined;
      },
    },
    insights_results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    insights_query: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    insights_sort: {
      defaultValue: null,
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
  });

  const setFactQuery = (str: string) => {
    setQuery({ fact_query: str });
  };
  const setFactResults = (val: string) => {
    setQuery({ fact_results: Number(val) });
  };
  const setFactSort = (val: string) => {
    setQuery({ fact_sort: val });
  };

  const setInsightsSort = (val: string) => {
    setQuery({ insights_sort: val });
  };

  const setInsightsQuery = (str: string) => {
    setQuery({ insights_query: str });
  };
  const setInsightsResults = (val: string) => {
    setQuery({ insights_results: Number(val) });
  };

  const handleInsightsDateChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates) {
      const formattedRange = dates
        .filter(Boolean) // remove falsy values
        .map(date => date!.format('YYYY-MM-DD'));
      setQuery({ insights_dates: formattedRange });
    } else {
      setQuery({ insights_dates: null });
    }
  };

  const { insights, facts } = environment;

  return (
    <InsightsPageWrapper>
      <Collapse
        type="default"
        borderless
        items={[
          {
            children: (
              <>
                <LagoonFilter
                  searchOptions={{
                    searchText: fact_query || '',
                    setSearchText: setFactQuery as React.Dispatch<SetStateAction<string>>,
                  }}
                  sortOptions={{
                    options: factsSortvalues,
                    selectedState: fact_sort,
                    setSelectedState: setFactSort as React.Dispatch<SetStateAction<unknown>>,
                  }}
                />
                <FactsTable
                  facts={facts}
                  filterString={fact_query}
                  resultsPerPage={fact_results}
                  sortBy={fact_sort as any}
                  resultDropdown={
                    <Select
                      options={resultsFilterValues}
                      value={fact_results}
                      defaultOpen={false}
                      placeholder="Number of facts"
                      onSelect={val => {
                        setFactResults(val);
                      }}
                    />
                  }
                />
              </>
            ),
            key: 'facts',
            label: <Head3>Facts</Head3>,
          },
        ]}
      />

      <Collapse
        type="default"
        borderless
        items={[
          {
            children: (
              <>
                <LagoonFilter
                  searchOptions={{
                    searchText: insights_query || '',
                    setSearchText: setInsightsQuery as React.Dispatch<SetStateAction<string>>,
                  }}
                  sortOptions={{
                    options: insightsSortValues,
                    selectedState: insights_sort,
                    setSelectedState: setInsightsSort as React.Dispatch<SetStateAction<unknown>>,
                  }}
                >
                  <CustomRangePicker range={insights_dates} handleRangeChange={handleInsightsDateChange} />
                </LagoonFilter>
                <InsightsTable
                  insights={insights}
                  filterDateRange={insights_dates}
                  filterString={insights_query}
                  resultsPerPage={insights_results}
                  sortBy={insights_sort as any}
                  resultDropdown={
                    <Select
                      options={resultsFilterValues}
                      value={insights_results}
                      defaultOpen={false}
                      placeholder="Number of insights"
                      onSelect={val => {
                        setInsightsResults(val);
                      }}
                    />
                  }
                />
              </>
            ),
            key: 'insights',
            label: <Head3>Insights</Head3>,
          },
        ]}
      />
    </InsightsPageWrapper>
  );
}
