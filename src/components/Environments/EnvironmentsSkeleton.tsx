import React from "react";
import Box from "components/Box";
import { StyledEnvironments } from "./StyledEnvironments";
import Skeleton from "react-loading-skeleton";
import ThemedSkeletonWrapper from "../../styles/ThemedSkeletonWrapper";

const EnvironmentsSkeleton = () => {
  const BoxWithSkeleton = (
    <div className="environment">
      <Box className="box skeleton">
        <Skeleton style={{ marginBottom: "8px", width: "25%" }} inline />
        <Skeleton
          style={{ marginBottom: "8px", width: "20%", marginLeft: "40%" }}
        />

        <Skeleton style={{ marginBottom: "8px" }} width={"35%"} height={20} />
        <Skeleton style={{ marginBottom: "8px" }} width={"25%"} />
        <Skeleton style={{ marginBottom: "8px" }} width={"35%"} />
      </Box>
    </div>
  );
  return (
    <ThemedSkeletonWrapper>
      <StyledEnvironments className="environments">
        {BoxWithSkeleton}
        {BoxWithSkeleton}
      </StyledEnvironments>
    </ThemedSkeletonWrapper>
  );
};

export default EnvironmentsSkeleton;
