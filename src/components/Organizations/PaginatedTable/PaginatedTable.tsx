import React, { ChangeEvent, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import { SearchBar } from '../Orgheader/Styles';
import {
  Checkbox,
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
  [key: string]:
    | string
    | Record<string, string>
    | Record<string, Pick<Props, 'data'> | string[]>
    | Array<Record<string, string>>;
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
  disableUrlMutation?: boolean;
  defaultViewOptions?: {
    type: 'group' | 'user';
    selected: boolean;
  };
  numericSortOptions?: {
    key?: string;
    displayName: string;
    orderList?: string[];
    orderListKey?: string;
  };
  labelText?: string;
  limit: number;
  emptyText: string;
}

// currently possible...
type SortMethod = 'alphabetical' | 'numeric' | undefined;

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
  defaultViewOptions,
  numericSortOptions,
  emptyText,
  labelText,
  limit = 10,
  disableUrlMutation = false,
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
    ((initialSortMethod === 'alphabetical' || initialSortMethod === 'numeric') && initialSortMethod) || undefined
  );

  const [searchStr, setSearchStr] = useState<string>(initialSearchStr || '');
  const [inputValue, setInputValue] = useState<string>(searchStr);

  const [unfilteredData, setUnfilteredData] = useState(data);

  const [defaultsSelected, setDefaultsSelected] = useState(
    (defaultViewOptions && defaultViewOptions.selected) || false
  );

  useEffect(() => {
    setUnfilteredData(data);
  }, [data]);

  const sortedFilteredData = useMemo(() => {
    let filtered = !searchStr
      ? unfilteredData
      : unfilteredData.filter(key => {
          // @ts-ignore
          const k = !usersTable ? key.name : ((key.user ? key.user?.email : key.email) as string);
          return k.toLowerCase().includes(searchStr.toLowerCase());
        });

    if (!defaultsSelected) {
      if (defaultViewOptions?.type === 'group') {
        filtered = filtered.filter(dataItem => dataItem.type !== 'project-default-group');
      }
      if (defaultViewOptions?.type === 'user') {
        filtered = filtered.filter(dataItem => {
          //@ts-ignore
          const filterItem = dataItem.email ? dataItem.email : (dataItem.user.email as string);
          return !(filterItem as string).startsWith('default-user');
        });
      }
    }
    if (withSorter) {
      if (sortMethod === 'alphabetical') {
        return filtered.sort(function (a, b) {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          } else {
            //@ts-ignore
            return (a?.user?.firstName as string)?.localeCompare(b?.user?.firstName as string);
          }
        });
      }
      if (sortMethod === 'numeric' && typeof numericSortOptions !== 'undefined') {
        return filtered.sort(function (a, b) {
          // determine if directly filtering an array value or a primitive.
          let first: number = 0,
            second: number = 0;

          const key = numericSortOptions.key;
          if (key) {
            if (Array.isArray(a[key])) {
              first = a[key].length as number;
              second = b[key].length as number;
            } else {
              first = a[key] as unknown as number;
              second = b[key] as unknown as number;
            }
            return second - first;
          } else {
            // precedence sort
            const list = numericSortOptions.orderList;
            const listKey = numericSortOptions.orderListKey;
            if (list && listKey) {
              const roleToIdx = {};
              list.forEach((role, idx) => {
                roleToIdx[role] = idx;
              });
              //@ts-ignore
              first = roleToIdx[a[listKey]] as number;
              //@ts-ignore
              second = roleToIdx[b[listKey]] as number;

              if (first === undefined && second === undefined) {
                // not in the provided list, keep the original position
                return 0;
              } else if (first === undefined) {
                return 1;
              } else if (second === undefined) {
                return -1;
              } else {
                return first - second;
              }
            }
          }

          return second - first;
        });
      }

      return filtered;
    } else {
      return filtered;
    }
  }, [searchStr, withSorter, sortMethod, unfilteredData, defaultsSelected]);

  const resultIndex = (currentPage - 1) * resultLimit;

  const resultsToDisplay = sortedFilteredData.slice(resultIndex, resultIndex + resultLimit);

  const totalPages = Math.ceil(sortedFilteredData.length / resultLimit);

  useEffect(() => {
    if (currentPage > totalPages || currentPage < 0) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const updateUrl = () => {
    // update the url bar without reloads.
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    history.replaceState({ ...history.state, as: newUrl, url: newUrl }, '', newUrl);
  };

  // query string update effects.
  useEffect(() => {
    if (searchStr) {
      params.set('search', searchStr);
    } else {
      params.delete('search');
    }
    if (sortMethod && ['alphabetical', 'numeric'].includes(sortMethod)) {
      params.set('sort', sortMethod);
    } else {
      params.delete('sort');
    }
    if (resultLimit) {
      params.set('limit', String(resultLimit));
    } else {
      params.delete('limit');
    }
    if (currentPage) {
      params.set('page', String(currentPage));
    } else {
      params.delete('page');
    }

    if (!disableUrlMutation) updateUrl();
  }, [searchStr, sortMethod, resultLimit, currentPage]);

  const handleSearchUpdate = useCallback(
    debounce(val => {
      setSearchStr(val);
    }, 150),
    []
  );

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    let newSort;
    if (['alphabetical', 'numeric'].includes(selected)) newSort = selected;

    setSortMethod(newSort as SortMethod);
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
    <StyledTable className="paginatedTable">
      <Filters className="filters">
        {labelText ? (
          <span className="labelText">
            {labelText} {`(${sortedFilteredData.length})`}
          </span>
        ) : (
          ''
        )}
        {defaultViewOptions ? (
          <Checkbox>
            {defaultViewOptions.type === 'group' ? 'Show system groups' : 'Show default users'}
            <input
              type="checkbox"
              checked={defaultsSelected}
              onChange={({ target: { checked } }) => setDefaultsSelected(checked)}
            />
          </Checkbox>
        ) : null}
        {withSorter ? (
          <select onChange={handleSortChange} placeholder="Sort by" defaultValue={''}>
            <option value="" disabled hidden>
              Sort by
            </option>
            <option value={undefined}>None</option>
            <option value="alphabetical">Alphabetical</option>
            {typeof numericSortOptions !== 'undefined' && (
              <option value="numeric">{numericSortOptions.displayName}</option>
            )}
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
            <TableRow className="tableRow" key={`${i.id ? i.id : idx}-row-${labelText ? labelText : ''}`}>
              {columns?.map(col => {
                return (
                  <TableColumn key={`${col.key}-${idx}-${labelText ? labelText : ''}`} width={col.width}>
                    {col.render(i)}
                  </TableColumn>
                );
              })}
            </TableRow>
          );
        })
      ) : (
        <TableEmpty className="empty">{emptyText}</TableEmpty>
      )}

      <TableFooter className="tableFooter">
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
                <span key={`${idx}-${labelText ? labelText : ''}`} className={page === currentPage ? 'active' : ''}>
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
