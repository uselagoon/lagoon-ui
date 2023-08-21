import React, { ChangeEvent, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import { SearchBar } from '../Orgheader/Styles';
import {
  Filters,
  NextBtn,
  Pagination,
  PreviousBtn,
  SelectLimit,
  StyledTable,
  TableColumn,
  TableEmpty,
  TableFooter,
  TableRow,
} from './Styles';

type DataType = {
  [key: string]: string | Record<string, string | Pick<Props, 'data'> | string[]>;
  name: string;
  id: string;
};
interface Props {
  data: DataType[];
  columns: {
    key: string;
    width: string;
    render: (item: DataType) => ReactNode;
  }[];
  usersTable?: boolean;
  withSorter?: boolean;
  labelText?: string;
  limit: number;
  emptyText: string;
}

// currently possible...
type SortMethod = 'alphabetical' | undefined;

const debounce = (fn: (val: string) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (val: string) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.call(null, val);
    }, delay);
  };
};

const PaginatedTable: FC<Props> = ({
  data = [],
  columns,
  usersTable,
  withSorter,
  emptyText,
  labelText,
  limit = 10,
}) => {
  const params = new URLSearchParams(window.location.search);

  // initial qs params.
  const initialPageNumber = params.get('page');
  const initialLimit = params.get('limit');
  const initialSearchStr = params.get('search');
  const initialSortMethod = params.get('sort');

  const [resultLimit, setResultLimit] = useState<number>((initialLimit && +initialLimit) || limit);

  const [currentPage, setCurrentPage] = useState<number>((initialPageNumber && +initialPageNumber) || 1);

  const [sortMethod, setSortMethod] = useState<SortMethod>(
    (initialSortMethod === 'alphabetical' && initialSortMethod) || undefined
  );

  const [searchStr, setSearchStr] = useState<string>(initialSearchStr || '');
  const [inputValue, setInputValue] = useState<string>(searchStr);

  const [unfilteredData, setUnfilteredData] = useState(data);

  useEffect(() => {
    setUnfilteredData(data);
  }, [data]);

  const sortedFilteredData = useMemo(() => {
    const filtered = !searchStr
      ? unfilteredData
      : unfilteredData.filter(key => {
          // @ts-ignore
          const k = !usersTable ? key.name : 
            (key.user ? key.user?.email : key.email) as string;
          return k.toLowerCase().includes(searchStr.toLowerCase());
        });

    if (withSorter && sortMethod === 'alphabetical') {
      return filtered.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    } else {
      return filtered;
    }
  }, [searchStr, withSorter, sortMethod, unfilteredData]);

  const resultIndex = (currentPage - 1) * resultLimit;

  const resultsToDisplay = sortedFilteredData.slice(resultIndex, resultIndex + resultLimit);

  const totalPages = Math.ceil(sortedFilteredData.length / resultLimit);

  useEffect(() => {
    if (currentPage > totalPages || currentPage < 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const updateUrl = () =>
    // update the url bar without reloads.
    history.replaceState(
      null,
      '',
      `${window.location.origin}${window.location.pathname}?${params.toString()}${window.location.hash}`
    );

  // query string update effects.
  useEffect(() => {
    if (searchStr) {
      params.set('search', searchStr);
    } else {
      params.delete('search');
    }
    updateUrl();
  }, [searchStr]);

  useEffect(() => {
    if (sortMethod === 'alphabetical') {
      params.set('sort', sortMethod);
    } else {
      params.delete('sort');
    }
    updateUrl();
  }, [sortMethod]);

  useEffect(() => {
    if (resultLimit) {
      params.set('limit', String(resultLimit));
    } else {
      params.delete('limit');
    }
    updateUrl();
  }, [resultLimit]);

  useEffect(() => {
    if (currentPage) {
      params.set('page', String(currentPage));
    } else {
      params.delete('page');
    }
    updateUrl();
  }, [currentPage]);

  const handleSearchUpdate = useCallback(
    debounce(val => {
      setSearchStr(val);
    }, 150),
    []
  );

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value === 'alphabetical' ? 'alphabetical' : undefined);
  };

  const handleResultChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const limit = e.target.value;
    setResultLimit(+limit);
  };

  const handlePageChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.tagName === 'SPAN') {
      const parsedNum = parseInt(clickedElement.textContent as string);
      if (!isNaN(parsedNum)) {
        setCurrentPage(parsedNum);
      }
    }
  };
  const goBack = () => {
    if (currentPage && currentPage !== 1) setCurrentPage(current => current - 1);
  };

  const goForward = () => {
    if (currentPage && currentPage < totalPages) setCurrentPage(current => current + 1);
  };

  const maxPagination = 5;
  const startPage = Math.max(currentPage - Math.floor(maxPagination / 2), 1);
  const endPage = Math.min(startPage + maxPagination - 1, totalPages);

  return (
    <StyledTable>
      <Filters>
        {labelText ? <span className="labelText">{labelText}</span> : ''}
        {withSorter ? (
          <select onChange={handleSortChange}>
            <option value={undefined}>Sort by</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        ) : null}
        <SearchBar className="search">
          <SearchOutlined className="icon" />
          <input
            type="text"
            value={inputValue}
            aria-labelledby="search"
            className="searchBar"
            placeholder="Type to search"
            onChange={e => {
              const val = e.target.value;
              setInputValue(val);
              handleSearchUpdate(val);
            }}
          />
        </SearchBar>
      </Filters>
      {resultsToDisplay.length ? (
        resultsToDisplay.map((i, idx) => {
          return (
            <TableRow key={i.id}>
              {columns?.map(col => {
                return (
                  <TableColumn key={`${col.key}-${idx}`} width={col.width}>
                    {col.render(i)}
                  </TableColumn>
                );
              })}
            </TableRow>
          );
        })
      ) : (
        <TableEmpty>{emptyText}</TableEmpty>
      )}

      <TableFooter>
        <SelectLimit>
          <span>Results per page</span>
          <select onChange={handleResultChange} value={resultLimit}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={sortedFilteredData.length}>All</option>
          </select>
        </SelectLimit>

        <Pagination onClick={handlePageChange}>
          <PreviousBtn onClick={goBack} className={!currentPage || currentPage === 1 ? 'disabled' : ''}>
            {'<'}
          </PreviousBtn>
          {endPage - startPage >= 0 &&
            Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
              const page = startPage + idx;
              return (
                <span key={idx} className={page === currentPage ? 'active' : ''}>
                  {page}
                </span>
              );
            })}

          <NextBtn onClick={goForward} className={!currentPage || !(currentPage < totalPages) ? 'disabled' : ''}>
            {'>'}
          </NextBtn>
        </Pagination>
      </TableFooter>
    </StyledTable>
  );
};

export default PaginatedTable;
