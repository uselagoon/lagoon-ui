import React from "react";
import Skeleton from "react-loading-skeleton";
import { Header, StyledFacts } from "./StyledFacts";

const FactsSkeleton = () => {
  const factsCount = 10;

  return (
    <StyledFacts>
      <div className="filters">
        <input
          type="text"
          id="filter"
          placeholder="Filter facts e.g. PHP version"
          value={undefined}
        />
      </div>
      <Header>
        <button type="button" className="button-sort name">
          Name
        </button>
        <button type="button" className="button-sort value">
          Source
        </button>
        <button type="button" className="button-sort value">
          Value
        </button>
      </Header>
      <div className="data-table">
        {[...Array<undefined>(factsCount)].map((_,idx) => (
          <div className="data-row row-heading" key={idx}>
            <div className="col col-1">
              <div className="name">
                <Skeleton />
              </div>
              <div className="description">
                <Skeleton />
              </div>
            </div>
            <div className="col col-2">
              <Skeleton />
            </div>
            <div className="col col-3">
              <Skeleton />
            </div>
          </div>
        ))}
      </div>
    </StyledFacts>
  );
};

export default FactsSkeleton;
