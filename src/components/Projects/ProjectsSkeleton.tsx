import React from "react";

import Box from "components/Box";
import {
  ProjectsHeader,
  SearchInput,
  StyledProject,
  ProjectsPage,
} from "./StyledProjects";
import Skeleton from "react-loading-skeleton";

const ProjectsSkeleton = () => {
  const RenderSkeletonBox = (index: number) => {
    return (
      <Box className="box">
        <StyledProject>
          <h4>
            <Skeleton style={{ width: `${index % 2 ? "50%" : "80%"}` }} />
          </h4>
        </StyledProject>
      </Box>
    );
  };
  // fit skeleton items on 80vh
  const numberOfItems =
    typeof window !== "undefined"
      ? Math.floor((window.innerHeight * 8) / 10 / 65)
      : 10;
  return (
    <ProjectsPage>
      <ProjectsHeader>
        <label>
          <Skeleton width={"20%"} />
        </label>
        <label></label>
        <SearchInput
          aria-labelledby="search"
          className="searchInput"
          type="text"
          placeholder="Type to search"
        />
      </ProjectsHeader>
      <>{[...Array<undefined>(numberOfItems)].map((_, idx) => RenderSkeletonBox(idx))}</>
    </ProjectsPage>
  );
};

export default ProjectsSkeleton;
