import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { SearchOutlined } from '@ant-design/icons';

import { SearchBar } from '../Orgheader/Styles';
import { StyledGroupMembers } from './Styles';

const ProjectGroupSkeleton = () => {
  const numberOfFields = typeof window !== 'undefined' ? Math.floor(((window.innerHeight / 2) * 8) / 10 / 65) : 10;

  const groupsSkeleton = (key: number) => (
    <div className="data-row" key={key}>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div className="customer">
        <Skeleton height={40} />
      </div>
      <div>
        <Skeleton height={40} />
      </div>
    </div>
  );
  return (
    <StyledGroupMembers>
      <div className="tableheader skeleton">
        <label>Groups</label>

        <SearchBar className="search">
          <SearchOutlined className="icon" />
          <input aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" disabled />
        </SearchBar>
      </div>

      <div className="data-table">{[...Array<undefined>(numberOfFields)].map((_, idx) => groupsSkeleton(idx))}</div>
    </StyledGroupMembers>
  );
};

export default ProjectGroupSkeleton;
