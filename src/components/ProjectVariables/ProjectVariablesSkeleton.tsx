import React from 'react';
import Button from 'react-bootstrap/Button';
import Skeleton from 'react-loading-skeleton';

import { StyledProjectVariableTable, StyledProjectVariablesDetails } from './StyledProjectVariables';

const ProjectVariablesSkeleton = () => {
  const numberOfVariableFields = 3;

  const skeletonItem = (idx: number) => (
    <div className="data-row" key={idx}>
      <div className="varName">
        <Skeleton width={'90%'} />
      </div>
      <div className="scope">
        <Skeleton width={'90%'} />
      </div>
    </div>
  );

  return (
    <StyledProjectVariablesDetails>
      <div className="header">
        <label>Project Variables</label>
        <div className="header-buttons">
          <Button>Add</Button>
          <Button>Show values</Button>
        </div>
      </div>
      <StyledProjectVariableTable>
        <div className="table-header">
          <div className="name">
            <label>Name</label>
          </div>
          <div className="scope">
            <label>Scope</label>
          </div>
        </div>
        <div className="data-table">
          {[...Array<undefined>(numberOfVariableFields)].map((_, idx) => skeletonItem(idx))}
        </div>
      </StyledProjectVariableTable>
    </StyledProjectVariablesDetails>
  );
};

export default ProjectVariablesSkeleton;
