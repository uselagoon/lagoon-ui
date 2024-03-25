import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Box from 'components/Box';

import { Organization, OrganizationsPage, OrgsHeader, SearchInput } from './StyledOrganizations';

const OrganizationsSkeleton = () => {
  const RenderSkeletonBox = (index: number) => {
    return (
      <Box className="box" key={index}>
        <Organization>
          <h4>
            <Skeleton style={{ width: `${index % 2 ? '50%' : '80%'}` }} />
          </h4>
        </Organization>
      </Box>
    );
  };
  // fit skeleton items on 80vh
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  return (
    <OrganizationsPage>
      <OrgsHeader>
        <label>
          <Skeleton width={'20%'} />
        </label>
        <label></label>
        <SearchInput aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" />
      </OrgsHeader>
      <>{[...Array<undefined>(numberOfItems)].map((_, idx) => RenderSkeletonBox(idx))}</>
    </OrganizationsPage>
  );
};

export default OrganizationsSkeleton;
