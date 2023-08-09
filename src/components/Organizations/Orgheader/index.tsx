import { ChangeEvent, FC } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import { SearchBar, StyledOrgHeader } from './Styles';

interface Props {
  headerText: string;
  searchBar?: boolean;
  sorter?: boolean;
  searchProps?: {
    value: string;
    onChange: (e: ChangeEvent) => void;
    disabled: boolean;
  };
}

const OrgHeader: FC<Props> = ({ headerText, searchBar, searchProps }) => {
  return (
    <StyledOrgHeader>
      <span>{headerText}</span>
      {searchBar && (
        <SearchBar>
          <SearchOutlined className="icon" />
          <input
            aria-labelledby="search"
            className="searchBar"
            type="text"
            placeholder="Type to search"
            {...(searchProps || {})}
          />
        </SearchBar>
      )}
    </StyledOrgHeader>
  );
};

export default OrgHeader;
