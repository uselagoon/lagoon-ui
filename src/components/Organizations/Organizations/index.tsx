import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';

import Box from 'components/Box';
import OrganizationLink from 'components/link/Organizations/Organization';

import { Organization, OrganizationsPage, OrgsHeader, SearchInput } from './StyledOrganizations';

export interface IOrganization {
  id: string;
  name: string;
  description: string;
  __typename: 'Organization';
}

/**
 * The primary list of organizations.
 */
const Organizations = ({ organizations = [] }: { organizations: IOrganization[] }) => {
  const [searchInput, setSearchInput] = useState('');

  const filteredOrganizations = organizations.filter(key => {
    const sortByName = key.name.toLowerCase().includes(searchInput.toLowerCase());
    const sortByUrl = '';
    return ['name', 'environments', '__typename'].includes(key.name) ? false : (true && sortByName) || sortByUrl;
  });

  return (
    <OrganizationsPage>
      <OrgsHeader>
        <label>Organizations</label>
        <label></label>
        <SearchInput
          aria-labelledby="search"
          className="searchInput"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
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
      {searchInput && !filteredOrganizations.length && (
        <Box className="box">
          <Organization>
            <h4>No organizations matching &quot;{searchInput}&quot;</h4>
          </Organization>
        </Box>
      )}
      {filteredOrganizations.map(organization => (
        <OrganizationLink organizationSlug={organization.id} organizationName={organization.name} key={organization.id}>
          <Box className="box">
            <Organization>
              <h4>
                <Highlighter searchWords={[searchInput]} autoEscape={true} textToHighlight={organization.name} />
              </h4>
              <div className="description">
                <Highlighter searchWords={[searchInput]} autoEscape={true} textToHighlight={organization.description} />
              </div>
            </Organization>
            <div className="customer"></div>
          </Box>
        </OrganizationLink>
      ))}
    </OrganizationsPage>
  );
};

export default Organizations;
