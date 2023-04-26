import React from 'react';
import Skeleton from 'react-loading-skeleton';

import Box from 'components/Box';

import ThemedSkeletonWrapper from '../../styles/ThemedSkeletonWrapper';
import { ProjectsHeader, ProjectsPage, SearchInput, StyledProject } from './StyledProjects';

const ProjectsSkeleton = () => {
  const RenderSkeletonBox = (index: number) => {
    return (
      <Box className="box">
        <StyledProject>
          <h4>
            <Skeleton style={{ width: `${index % 2 ? '50%' : '80%'}` }} />
          </h4>
        </StyledProject>
      </Box>
    );
  };
  // fit skeleton items on 80vh
  const numberOfItems = typeof window !== 'undefined' ? Math.floor((window.innerHeight * 8) / 10 / 65) : 10;

  return (
    <ProjectsPage>
      <ThemedSkeletonWrapper>
        <ProjectsHeader>
          <label>
            <Skeleton width={'20%'} />
          </label>
          <label></label>
          <SearchInput aria-labelledby="search" className="searchInput" type="text" placeholder="Type to search" />
        </ProjectsHeader>
        <>{[...Array<undefined>(numberOfItems)].map((_, idx) => RenderSkeletonBox(idx))}</>
      </ThemedSkeletonWrapper>
    </ProjectsPage>
  );
};

export default ProjectsSkeleton;
