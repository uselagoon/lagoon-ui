import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Box from 'components/Box';
import OrganizationLink from 'components/link/Organizations/Organization';
import { debounce } from 'lib/util';

import { Organization, OrganizationsPage, OrgsHeader, SearchInput } from './StyledOrganizations';

export interface IOrganization {
  id: number;
  name: string;
  description: string;
  friendlyName?: string;
  __typename: 'Organization';
}

interface OrganizationProps {
  organizations: IOrganization[];
  initialSearch: string;
}
/**
 * The primary list of organizations.
 */
const Organizations: FC<OrganizationProps> = ({ organizations = [], initialSearch }) => {
  const [searchInput, setSearchInput] = useState(initialSearch || '');

  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredOrgs, setFilteredOrgs] = useState(organizations);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const timerLengthPercentage = useMemo(
    () => Math.min(1000, Math.max(40, Math.floor(organizations.length * 0.0725))),
    [organizations.length]
  );

  const debouncedSearch = useCallback(
    debounce((searchVal: string) => {
      setSearchInput(searchVal);
    }, timerLengthPercentage),
    []
  );

  const handleSearch = (searchVal: string) => {
    setIsFiltering(true);
    debouncedSearch(searchVal);
  };

  useEffect(() => {
    const filterOrgs = async (): Promise<IOrganization[]> => {
      return new Promise(resolve => {
        const filteredOrganizations = organizations.filter(org => {
          const searchStrLowerCase = searchInput.toLowerCase();
          const filterFn = (key?: string) => key?.toLowerCase().includes(searchStrLowerCase);

          const sortByName = filterFn(org.name);
          const sortByDesc = filterFn(org.description);
          const sortByFriendlyName = filterFn(org.friendlyName);

          if (['__typename', 'name', 'id'].includes(org.name)) {
            return false;
          }
          return sortByName || sortByFriendlyName || sortByDesc;
        });

        resolve(filteredOrganizations);
      });
    };

    void filterOrgs()
      .then(filtered => setFilteredOrgs(filtered))
      .finally(() => setIsFiltering(false));
  }, [searchInput, organizations]);

  const filteredMappedOrgs = useMemo(() => {
    return filteredOrgs.map(organization => (
      <OrganizationLink
        organizationSlug={organization.name}
        organizationId={organization.id}
        key={organization.id}
        orgFriendlyName={organization.friendlyName}
      >
        <Box className="box">
          <Organization>
            <h4>
              <Highlighter
                searchWords={[searchInput]}
                autoEscape={true}
                textToHighlight={organization.friendlyName || organization.name}
              />
            </h4>
            <div className="description">
              <Highlighter searchWords={[searchInput]} autoEscape={true} textToHighlight={organization.description} />
            </div>
          </Organization>
          <div className="customer"></div>
        </Box>
      </OrganizationLink>
    ));
  }, [filteredOrgs]);

  return (
    <OrganizationsPage>
      <OrgsHeader>
        <label>
          Organizations
          {isFiltering && <Spin indicator={<LoadingOutlined />} />}
        </label>
        <label></label>
        <SearchInput
          ref={searchInputRef}
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Type to search"
          disabled={organizations.length === 0}
        />
      </OrgsHeader>
      {!organizations.length && (
        <Box className="box">
          <Organization>
            <h4>No organizations</h4>
          </Organization>
        </Box>
      )}
      {searchInput && !filteredMappedOrgs.length && (
        <Box className="box">
          <Organization>
            <h4>No organizations matching &quot;{searchInput}&quot;</h4>
          </Organization>
        </Box>
      )}
      {filteredMappedOrgs}
    </OrganizationsPage>
  );
};

export default Organizations;
